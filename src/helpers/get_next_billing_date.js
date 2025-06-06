import moment from 'moment';
import { get_formated_date } from './get_formated_date';
/**
 * Return the one day next to the date in DD MMM YYYY format
 * @param {Date} date -> fomrats the date and then
 * @returns {Date} -> adding one day to it.
 */
export const get_next_billing_date = (date) => {
  return get_formated_date(moment(date).add(1, 'days').toISOString());
};
