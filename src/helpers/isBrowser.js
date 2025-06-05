/**
 * Checks if the code is running in a browser environment
 * @returns {boolean} True if running in a browser, false otherwise
 */
const isBrowser = () => {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
};

export default isBrowser; 