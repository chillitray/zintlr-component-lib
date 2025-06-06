/**
 * This function takes a URL and formats it to ensure it starts with "https://". If the URL is not provided or does not start with "http", it will be prefixed with "https://" before returning.
 * @param {string} url The URL that needs to be formatted.
 * @returns {string} The formatted URL starting with "https://".
 */
export const get_formated_url = (url) => {
  // Check if the URL is not provided (empty or null)
  if (!url) {
    // If URL is not provided, return an empty string
    return '';
  }
  // Check if the URL does not start with "http"
  if (url.substr(0, 4) !== 'http') {
    // If URL does not start with "http", prefix it with "https://" and return the updated URL
    return 'https://' + url;
  }
  // If URL starts with "http", return the URL as it is
  return url;
}
