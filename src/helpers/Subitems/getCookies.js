/**
 * This function is used to retrieve the value of a specific cookie by its name from the document's cookies.
 * @param {string} name The name of the cookie whose value is to be retrieved.
 * @returns {string} The value of the specified cookie if found, otherwise an empty string.
 */
const getCookieValue = name => {
  // Splitting the cookies string into an array of individual cookie strings.
  const cookies = document.cookie.split('; ');

  // Looping through each cookie to find the one with the specified name.
  for (let i = 0; i < cookies.length; i++) {
    // Splitting the current cookie string into its name and value.
    const cookie = cookies[i].split('=');

    // Checking if the name of the current cookie matches the specified name.
    if (cookie[0] === name) {
      // If the name matches, return the value of the cookie.
      return cookie[1];
    }
  }
  // If the specified cookie name is not found, return an empty string.
  return '';
};

export { getCookieValue };
