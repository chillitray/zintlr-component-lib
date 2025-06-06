/**
 * This file contains the helper function for Table Component
 */

/**
 * Compare a given string with a query to determine
 * if they match after trimming and case normalization.
 *
 * @param {string} string_to_match - The string to be compared.
 * @param {string} query - The query string for comparison.
 * @returns {boolean} True if the strings match, otherwise false.
 */
const filter_string = (string_to_match, query) => {
  // If either the string or the query is empty, return false.
  if (!string_to_match || !query) {
    return false;
  }
  // Convert both the string and the query to lowercase after trimming
  // and check if the query is included in the string.
  if (string_to_match?.trim().toLowerCase().includes(query?.trim().toLowerCase())) {
    return true; // If the query is found in the string, return true.
  }
  return false; // If no match is found, return false.
};

/**
 * Filter an array of values or objects based on a query value.
 *
 * @param {Array} array - The array to be filtered.
 * @param {string} val - The query value for filtering.
 * @returns {boolean} True if a matching value is found, otherwise false.
 */
const filter_array = (array = [], val) => {
  // Check if any element in the array matches the given query value.
  return array.some((a) => {
    if (typeof a === 'object') {
      // If the element is an object, check if any of its values match the query.
      return Object.values(a).some((b) => filter_string(b, val));
    }
    // If the element is not an object, directly check if it matches the query.
    return filter_string(a, val);
  });
};

/**
 * Filter rows based on a given field name, values, and a query.
 *
 * @param {string} element - Field name for which we will check the data e.g. full_name.
 * @param {Object|Array|string} values - Values to be filtered.
 * @param {string} query - Query value for filtering.
 * @returns {boolean} True if a match is found, otherwise false.
 */
export const table_filter_rows = (element, values, query) => {
  // If the element is missing, return false.
  if (!element) {
    return false;
  }

  //If field name has ".", it means it's an key from the object
  //Split it, e.g. user_data.name -> we have to match the query for name in user_data
  const props = element.split('.');
  let string_to_match;

  //If values is object and values has the item field
  if (typeof values === 'object' && values[element]) {
    //Get the value of the field
    string_to_match = values[element];
  } else {
    //else check if values is not array, it contains the first item from the props
    //e.g. Check if values contains "user_data"
    string_to_match =
      typeof values === 'object' && !Array.isArray(values) ? values[props[0]] : values;
  }
  //If no value found to match, return false
  if (!string_to_match) {
    return false;
  }
  //Else start filtering
  let filtered = false;

  // If the string_to_match is an array, use filter_array function for filtering.
  if (Array.isArray(string_to_match)) {
    filtered = filter_array(string_to_match, query);
  } else if (typeof string_to_match === 'object') {
    // Understand by example
    // props->["user_data", "name"]
    if (props.length > 1) {
      let i = 0,
        prop;
      //now we have user_data in the obj
      let obj = { ...values };
      //TODO: Something is wrong here, i should start with 1, do check
      for (; i < props.length - 1; i++) {
        prop = props[i];
        obj = obj[prop];
      }
      string_to_match = obj[props[i]];
      // If nested property filtering matches, return true.
      if (table_filter_rows('', string_to_match, query)) {
        return true;
      }
    } else {
      // Use filter_rows function on nested object values.
      filtered = Object.values(string_to_match).some((a) => table_filter_rows('', a, query));
    }
  } else {
    // Convert string_to_match to string and use filter_string function for filtering.
    string_to_match += '';
    filtered = filter_string(string_to_match, query);
  }
  return filtered;
};
