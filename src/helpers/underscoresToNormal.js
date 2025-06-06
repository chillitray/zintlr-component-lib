/**
 * This function converts an underscore-separated string into a normal text format with capitalized words.
 * @param {string} input The underscore-separated string to be converted (e.g., 'work_phone').
 * @returns {string} The converted string with spaces and capitalized words (e.g., 'Work Phone').
 */

export default function underscoresNormalText(input) {
  return input
    .split('_') // Split the string into parts by underscores
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each part
    .join(' '); // Join the parts with spaces
}
