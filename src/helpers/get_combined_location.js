/**
 * This function takes a location object as input and combines its city, state, and country properties into a single string.
 * @param {Object} location An object containing location details.
 * @param {string} location.city The city name (optional).
 * @param {string} location.state The state or province name (optional).
 * @param {string} location.country The country name (optional).
 * @returns {string} The combined location string.
 */
export const get_combined_location = (location) => {
  // Create an array containing the city, state, and country properties from the location object.
  const location_array = [location?.city, location?.state, location?.country]; //, location?.zipcode
  // Use the filter method to remove any undefined or null elements from the array, leaving only the non-empty values.
  // Then, join the non-empty values with a comma and space to create the final combined location string.
  return location_array.filter((a) => a).join(', ');
};
