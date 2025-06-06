import moment from 'moment';

/**
 * Calculates the number of remaining days between the provided date and a reference date.
 * @param {Date} date_to_differ The date to calculate remaining days for.
 * @param {Date?} date Optional. The reference date. Defaults to the current date.
 * @returns {number} The number of remaining days.
 */
export const get_remaining_days = (date_to_differ, date = new Date()) => {
  // Convert the reference date to a Moment.js object.
  let moment_date = moment(date);

  // Convert the target date to a Moment.js object for comparison.
  const expiry_date = moment(date_to_differ);

  // Calculate the difference in days between the reference and target dates.
  return expiry_date.diff(moment_date, 'days');
};
