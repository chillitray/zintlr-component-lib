/**
 * Checks if the code is running in a browser environment.
 * @returns {boolean} Returns true if the code is running in a browser, otherwise false.
 */
export default function isBrowser() {
  // Check if the 'window' object is defined, indicating that the code is running in a browser environment.
  return typeof window !== 'undefined';
}
