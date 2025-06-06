/**
 * Return the date in DD MMM YYYY format
 * @param {Date} date -> Date to format
 * @returns {Date}
 */
export default function get_formated_date(date) {
  return new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
