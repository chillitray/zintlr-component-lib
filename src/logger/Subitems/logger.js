// lib/logger.js - Fixed Production Logger
// Robust console logging system with emergency recovery - NO INFINITE LOOPS

// ==========================================
// GLOBAL CONSOLE BACKUP & EMERGENCY RECOVERY
// ==========================================

// Global console backup (saved on module load)
let GLOBAL_CONSOLE_BACKUP = null;

/**
 * Backup original console methods globally (run once on module load)
 */
function backupGlobalConsole() {
  if (!GLOBAL_CONSOLE_BACKUP) {
    GLOBAL_CONSOLE_BACKUP = {
      log: console.log.bind(console),
      warn: console.warn.bind(console),
      error: console.error.bind(console),
      info: console.info.bind(console),
    };
  }
}

/**
 * Emergency console restore (use if everything else fails)
 */
function emergencyRestoreConsole() {
  if (GLOBAL_CONSOLE_BACKUP) {
    console.log = GLOBAL_CONSOLE_BACKUP.log;
    console.warn = GLOBAL_CONSOLE_BACKUP.warn;
    console.error = GLOBAL_CONSOLE_BACKUP.error;
    console.info = GLOBAL_CONSOLE_BACKUP.info;

    console.log('Emergency console restoration completed!');
    return true;
  }
  return false;
}

// Backup console on module load
backupGlobalConsole();

// ==========================================
// SILENT INTERNAL LOGGER
// ==========================================

/**
 * Internal logger that NEVER gets captured - uses direct console access
 * This prevents infinite loops from internal logging
 */
class SilentInternalLogger {
  static log(message, ...args) {
    if (GLOBAL_CONSOLE_BACKUP) {
      GLOBAL_CONSOLE_BACKUP.log(`[LOGGER] ${message}`, ...args);
    }
  }

  static warn(message, ...args) {
    if (GLOBAL_CONSOLE_BACKUP) {
      GLOBAL_CONSOLE_BACKUP.warn(`[LOGGER] ${message}`, ...args);
    }
  }

  static error(message, ...args) {
    if (GLOBAL_CONSOLE_BACKUP) {
      GLOBAL_CONSOLE_BACKUP.error(`[LOGGER] ${message}`, ...args);
    }
  }

  static info(message, ...args) {
    if (GLOBAL_CONSOLE_BACKUP) {
      GLOBAL_CONSOLE_BACKUP.info(`[LOGGER] ${message}`, ...args);
    }
  }
}

// ==========================================
// PROCESS-LEVEL ERROR HANDLERS
// ==========================================

// Handle process-level events for emergency cleanup
if (typeof process !== 'undefined') {
  process.on('uncaughtException', error => {
    emergencyRestoreConsole();
    SilentInternalLogger.error(
      '🚨 Uncaught Exception - Console restored:',
      error.message
    );
  });

  process.on('unhandledRejection', reason => {
    emergencyRestoreConsole();
    SilentInternalLogger.error(
      '🚨 Unhandled Rejection - Console restored:',
      reason
    );
  });

  process.on('SIGINT', () => {
    emergencyRestoreConsole();
    SilentInternalLogger.log('🚨 SIGINT received - Console restored');
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    emergencyRestoreConsole();
    SilentInternalLogger.log('🚨 SIGTERM received - Console restored');
    process.exit(0);
  });
}

// ==========================================
// ACTIVE LOGGER TRACKING
// ==========================================

// Track active loggers to prevent conflicts
const activeLoggers = new Map();
let currentActiveLogger = null; // Track the single active logger

/**
 * Emergency cleanup all active loggers
 */
function cleanupAllLoggers() {
  try {
    for (const [requestId, logger] of activeLoggers.entries()) {
      try {
        logger.forceStopCapturing();
      } catch (error) {
        SilentInternalLogger.error(
          `Failed to cleanup logger ${requestId}:`,
          error.message
        );
      }
    }
    activeLoggers.clear();
    currentActiveLogger = null;
    emergencyRestoreConsole();
    SilentInternalLogger.log('🧹 All loggers cleaned up');
  } catch (error) {
    emergencyRestoreConsole();
  }
}

/**
 * Extract filename from stack trace
 */
function extractFileName(stack) {
  try {
    if (!stack) return 'unknown';

    const lines = stack.split('\n');
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (
        line.includes('pages/') ||
        line.includes('lib/') ||
        line.includes('src/')
      ) {
        const match = line.match(/([^/\\]+\.js):(\d+)/);
        if (match) {
          return `${match[1]}:${match[2]}`;
        }
      }
    }
    return 'unknown';
  } catch (error) {
    return 'unknown';
  }
}

// ==========================================
// MAIN REQUEST LOGGER CLASS
// ==========================================

class RequestLogger {
  constructor(requestData) {
    this.requestId = requestData.requestId;
    this.requestData = requestData;
    this.startTime = Date.now();
    this.logs = [];
    this.isCapturing = false;
    this.cleanupTimeout = null;

    // Store ORIGINAL console methods for this instance
    this.originalConsole = this.getOriginalConsole();

    // Add this instance to active loggers for emergency cleanup
    activeLoggers.set(this.requestId, this);
  }

  getOriginalConsole() {
    // ALWAYS use global backup to prevent recursive issues
    if (GLOBAL_CONSOLE_BACKUP) {
      return {
        log: GLOBAL_CONSOLE_BACKUP.log,
        warn: GLOBAL_CONSOLE_BACKUP.warn,
        error: GLOBAL_CONSOLE_BACKUP.error,
        info: GLOBAL_CONSOLE_BACKUP.info,
      };
    }

    // This should never happen, but fallback
    throw new Error('Global console backup not available');
  }

  /**
   * Capture a log entry (suppress immediate output, only show in summary)
   */
  captureLog(level, args) {
    // DON'T call original console - we only want summary output
    // Only capture for structured output
    const logEntry = {
      level,
      message: this.formatLogMessage(args),
      timestamp: new Date().toISOString(),
      file: this.extractFileName(new Error().stack),
      ...(level === 'error' &&
        args[0] instanceof Error && {
          stack: args[0].stack,
        }),
    };

    this.logs.push(logEntry);
  }

  /**
   * Format log message from arguments
   */
  formatLogMessage(args) {
    return args
      .map(arg => {
        if (typeof arg === 'object' && arg !== null) {
          try {
            return JSON.stringify(arg);
          } catch (error) {
            return '[Object]';
          }
        }
        return String(arg);
      })
      .join(' ');
  }

  /**
   * Add emoji prefix based on log level
   */
  addLogPrefix(level, message) {
    const prefixes = {
      log: '📝',
      info: 'ℹ️',
      warn: '⚠️',
      error: '❌',
    };

    const prefix = prefixes[level] || '📝';
    return `${prefix} ${message}`;
  }

  /**
   * Extract filename from stack trace
   */
  extractFileName(stack) {
    return extractFileName(stack);
  }

  /**
   * Override console methods for this request (with safety checks)
   */
  startCapturing() {
    try {
      // CRITICAL FIX: Check if another logger is already active
      if (currentActiveLogger && currentActiveLogger !== this.requestId) {
        SilentInternalLogger.warn(
          `⚠️ Another logger ${currentActiveLogger} is active. Stopping it first.`
        );

        // Find and stop the active logger
        const activeLogger = activeLoggers.get(currentActiveLogger);
        if (activeLogger) {
          activeLogger.forceStopCapturing();
        }

        // Force cleanup
        this.forceRestoreConsole();
      }

      // Set this as the current active logger BEFORE overriding console
      currentActiveLogger = this.requestId;

      // Override console methods with capturing versions
      const captureLog = (...args) => this.captureLog('log', args);
      const captureWarn = (...args) => this.captureLog('warn', args);
      const captureError = (...args) => this.captureLog('error', args);
      const captureInfo = (...args) => this.captureLog('info', args);

      // Mark functions with request ID for debugging
      captureLog.__requestId = this.requestId;
      captureWarn.__requestId = this.requestId;
      captureError.__requestId = this.requestId;
      captureInfo.__requestId = this.requestId;

      console.log = captureLog;
      console.warn = captureWarn;
      console.error = captureError;
      console.info = captureInfo;

      this.isCapturing = true;

      // Use SilentInternalLogger for internal logging to prevent recursion
      SilentInternalLogger.log(
        `🔍 Log capturing started for request: ${this.requestId}`
      );

      // Safety timeout - force cleanup after 30 seconds
      this.cleanupTimeout = setTimeout(() => {
        SilentInternalLogger.warn(
          `⚠️ Request ${this.requestId} timed out, forcing console cleanup`
        );
        this.forceStopCapturing();
      }, 30000);
    } catch (error) {
      SilentInternalLogger.error(
        `Failed to start capturing for ${this.requestId}:`,
        error.message
      );
      this.forceRestoreConsole();
    }
  }

  /**
   * Restore original console methods (with verification)
   */
  stopCapturing() {
    try {
      if (!this.isCapturing) {
        SilentInternalLogger.warn(
          `⚠️ Stop capturing called but not currently capturing for ${this.requestId}`
        );
        return;
      }

      // Clear timeout
      if (this.cleanupTimeout) {
        clearTimeout(this.cleanupTimeout);
        this.cleanupTimeout = null;
      }

      // Restore original console methods
      console.log = this.originalConsole.log;
      console.warn = this.originalConsole.warn;
      console.error = this.originalConsole.error;
      console.info = this.originalConsole.info;

      this.isCapturing = false;

      // Clear current active logger if it's this one
      if (currentActiveLogger === this.requestId) {
        currentActiveLogger = null;
      }

      // Verify restoration worked
      if (this.verifyConsoleRestoration()) {
        SilentInternalLogger.log(
          `🔍 Log capturing stopped for request: ${this.requestId}. Captured ${this.logs.length} logs.`
        );
      } else {
        SilentInternalLogger.error(
          `Console restoration verification failed for ${this.requestId}`
        );
        this.forceRestoreConsole();
      }

      // Remove from active loggers
      activeLoggers.delete(this.requestId);
    } catch (error) {
      SilentInternalLogger.error(
        `Error stopping capture for ${this.requestId}:`,
        error.message
      );
      this.forceRestoreConsole();
    }
  }

  /**
   * Force stop capturing (emergency cleanup)
   */
  forceStopCapturing() {
    try {
      if (this.cleanupTimeout) {
        clearTimeout(this.cleanupTimeout);
        this.cleanupTimeout = null;
      }

      this.isCapturing = false;

      // Clear current active logger if it's this one
      if (currentActiveLogger === this.requestId) {
        currentActiveLogger = null;
      }

      this.forceRestoreConsole();
      activeLoggers.delete(this.requestId);

      // Print summary even in emergency
      this.printSummary(new Error('Emergency cleanup'));
    } catch (error) {
      // Last resort
      emergencyRestoreConsole();
      currentActiveLogger = null;
    }
  }

  /**
   * Force restore console using global backup
   */
  forceRestoreConsole() {
    try {
      if (GLOBAL_CONSOLE_BACKUP) {
        console.log = GLOBAL_CONSOLE_BACKUP.log;
        console.warn = GLOBAL_CONSOLE_BACKUP.warn;
        console.error = GLOBAL_CONSOLE_BACKUP.error;
        console.info = GLOBAL_CONSOLE_BACKUP.info;

        SilentInternalLogger.log(
          `🔧 Force restored console for request: ${this.requestId}`
        );
        return true;
      }
    } catch (error) {
      // Absolute last resort
      emergencyRestoreConsole();
      currentActiveLogger = null;
    }
    return false;
  }

  verifyConsoleRestoration() {
    try {
      // Check if console methods match our original ones
      return (
        console.log === this.originalConsole.log &&
        console.warn === this.originalConsole.warn &&
        console.error === this.originalConsole.error &&
        console.info === this.originalConsole.info
      );
    } catch (error) {
      return false;
    }
  }

  log(...args) {
    this.captureLog('log', args);
  }

  info(...args) {
    this.captureLog('info', args);
  }

  warn(...args) {
    this.captureLog('warn', args);
  }

  error(...args) {
    this.captureLog('error', args);
  }

  generateLogSummary(error = null) {
    const endTime = Date.now();
    const duration = endTime - this.startTime;

    // Add emoji prefixes to all log messages
    const formattedLogs = this.logs.map(log => ({
      ...log,
      message: this.addLogPrefix(log.level, log.message),
    }));

    const summary = {
      requestId: this.requestId,
      timestamp: this.requestData.timestamp,
      duration: `${duration}ms`,
      request: {
        method: this.requestData.method,
        url: this.requestData.url,
        userAgent: this.requestData.userAgent,
        ip: this.requestData.ip,
      },
      totalLogs: formattedLogs.length,
      logsByLevel: {
        log: formattedLogs.filter(l => l.level === 'log').length,
        info: formattedLogs.filter(l => l.level === 'info').length,
        warn: formattedLogs.filter(l => l.level === 'warn').length,
        error: formattedLogs.filter(l => l.level === 'error').length,
      },
      logs: formattedLogs,
    };

    if (error) {
      summary.error = {
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString(),
      };
    }

    return summary;
  }

  /**
   * Print the structured log summary
   */
  printSummary(error = null) {
    const summary = this.generateLogSummary(error);
    SilentInternalLogger.log(JSON.stringify(summary));
    return summary;
  }

  /**
   * Get current request ID (useful for debugging)
   */
  getRequestId() {
    return this.requestId;
  }

  /**
   * Get current log count
   */
  getLogCount() {
    return this.logs.length;
  }

  /**
   * Get current logs
   */
  getLogs() {
    return [...this.logs];
  }
}

// ==========================================
// EXPORTS
// ==========================================

export { RequestLogger };

// Export emergency functions for critical situations
export { emergencyRestoreConsole, cleanupAllLoggers, extractFileName };
