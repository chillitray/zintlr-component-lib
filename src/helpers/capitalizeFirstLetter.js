/**
 * This function capitalizes the initial letter of a given string.
 * @param {string} str The input string to be capitalized.
 * @returns {string} The input string with the initial letter capitalized.
 */
export const capitalizeFirstLetter = (str) => {
  // Get the first character of the input string and convert it to uppercase.
  return str.charAt(0).toUpperCase() + str.slice(1);
};
