import moment from 'moment';

/**
 * Return the no of days in year or months or days
 * @param {days} -> the number of days
 * @returns {date} -> return in 2years/ 4 months/ 5 days format.
 */
export default function get_days_to_month_years(days) {
  return [
    moment.duration(days, 'days').years() &&
      `${moment.duration(days, 'days').years()} year${
        moment.duration(days, 'days').years() > 1 ? 's' : ''
      }`,
    moment.duration(days, 'days').months() &&
      `${moment.duration(days, 'days').months()} month${
        moment.duration(days, 'days').months() > 1 ? 's' : ''
      }`,
    (moment.duration(days, 'days').days() > 0 ||
      (moment.duration(days, 'days').years() === 0 &&
        moment.duration(days, 'days').months() === 0)) &&
      `${moment.duration(days, 'days').days()} day${
        moment.duration(days, 'days').days() > 1 ? 's' : ''
      }`,
  ]
    .filter(Boolean)
    .join(' ')
    .trim();
}
