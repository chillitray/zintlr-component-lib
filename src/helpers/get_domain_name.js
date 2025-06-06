/**
 * This function extracts the domain name from a given URL.
 * @param {string} url The input URL from which the domain name will be extracted.
 * @returns {string} The extracted domain name.
 */
export const get_domain_name = (url) => {
  // Check if the URL is provided. If not, return an empty string.
  if (!url) {
    return '';
  }

  // Create a new URL object from the input URL.
  const url_obj = new URL(url);

  // Return the hostname of the URL, which represents the domain name.
  return url_obj.hostname;
}
