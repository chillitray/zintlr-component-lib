/**
 * This function takes in three parameters and returns a modified string.
 * @param {number} count The number of items to determine whether to add the postfix or not.
 * @param {string} text The main text to which the postfix may be appended.
 * @param {string} postfix The postfix string that will be added to the main text when the count is greater than 1. Default is "s".
 * @returns {string} The modified string with the postfix added based on the count value.
 */
export default (count, text, postfix = 's') => {
  // Concatenate the main text and the postfix (if required) and return the result.
  return text + (count > 1 ? postfix : '');
};
