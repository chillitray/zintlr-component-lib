import { generateRequestId } from './generateRequestId';
import { RequestLogger } from './logger';

export function withGlobalLogging(handler) {
  return async (req, res) => {
    // Create request data
    const requestData = {
      requestId: req.headers['x-request-id'] || generateRequestId(),
      url: req.url,
      method: req.method,
      userAgent: req.headers['user-agent'] || 'unknown',
      ip:
        req.headers['x-forwarded-for'] ||
        req.headers['x-real-ip'] ||
        req.connection?.remoteAddress ||
        req.socket?.remoteAddress ||
        'unknown',
      timestamp: new Date().toISOString(),
    };

    // Create fresh logger instance for this request
    const logger = new RequestLogger(requestData);

    req.logger = logger;

    // Set request ID in response headers early
    try {
      if (!res.headersSent) {
        res.setHeader('x-request-id', requestData.requestId);
        res.setHeader('x-timestamp', requestData.timestamp);
      }
    } catch (error) {
      logger.originalConsole.warn(
        'Could not set response headers:',
        error.message
      );
    }

    // Robust cleanup function with error handling
    let isFinished = false;
    const cleanup = (reason = 'finish') => {
      if (!isFinished) {
        isFinished = true;

        try {
          logger.stopCapturing();
          logger.originalConsole.log(
            `✅ API Handler completed successfully (${reason})`
          );
          logger.printSummary();
        } catch (error) {
          // Emergency cleanup if normal cleanup fails
          logger.originalConsole.error(
            `Cleanup failed for ${requestData.requestId}:`,
            error.message
          );
          logger.forceStopCapturing();
        }
      }
    };

    // Listen for response events with error handling
    try {
      res.on('finish', () => cleanup('finish'));
      res.on('close', () => cleanup('close'));
      res.on('error', error => {
        logger.originalConsole.error(`Response error: ${error.message}`);
        cleanup('error');
      });
    } catch (error) {
      logger.originalConsole.warn(
        'Could not attach response listeners:',
        error.message
      );
    }

    // Backup cleanup timer (force cleanup after 60 seconds)
    const backupCleanup = setTimeout(() => {
      if (!isFinished) {
        logger.originalConsole.warn(
          `⚠️ Request ${requestData.requestId} exceeded 60s timeout, forcing cleanup`
        );
        cleanup('timeout');
      }
    }, 60000);

    try {
      // Start capturing console logs for this request
      logger.startCapturing();

      // Execute the handler (all console.log inside will be captured)
      const result = await handler(req, res);

      // Clear backup timer since handler completed
      clearTimeout(backupCleanup);

      return result;
    } catch (error) {
      // Clear backup timer
      clearTimeout(backupCleanup);

      // Handle error with proper cleanup
      if (!isFinished) {
        isFinished = true;

        try {
          logger.stopCapturing();
          logger.printSummary(error);
        } catch (cleanupError) {
          logger.forceStopCapturing();
        }
      }

      throw error;
    }
  };
}
