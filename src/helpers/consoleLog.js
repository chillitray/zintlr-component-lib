// ConsoleMsg.js
import logger from '@/pages/api/_logger';
import { current_env, PRODUCTION } from '../constant/endpoints';
import isBrowser from './isBrowser';

// Determine if debugging is enabled (not in production or running in a browser).
const prod_env = current_env === PRODUCTION;

// 1) Our improved format function
function formatLogInput(input) {
  if (input instanceof Error) {
    // Log the name, message, and stack
    return `[${input.name}] ${input.message}\n${input.stack || ''}`;
  }
  if (input && typeof input === 'object' && !Array.isArray(input)) {
    // Plain object (not array)
    return JSON.stringify(input, null, 2);
  }
  if (Array.isArray(input)) {
    // Array: recursively format each element, join with space
    return input.map(formatLogInput).join(' ');
  }
  // Stringify everything else (null, undefined, numbers, strings, etc.)
  return String(input);
}

// 2) Combine arguments into a single string
function combineLogArgs(args) {
  // Map each argument to a string, then join with a space (or newline if you want)
  return args.map(formatLogInput).join(' ');
}

// 3) Log by type if debugging is allowed
function logByType(args, type) {
  if (!prod_env) {
    if (isBrowser()) return;

    const message = combineLogArgs(args);

    // Winston: fallback to 'debug' if the method doesn't exist
    (logger[type] || logger.debug)(message);
  } else {
    console[type](args);
  }
}

// 4) Expose log methods
const ConsoleMsg = {
  log(...args) {
    logByType(args, 'info');
  },
  error(...args) {
    logByType(args, 'error');
  },
  warn(...args) {
    logByType(args, 'warn');
  },
};
export default ConsoleMsg;
