import { toast } from 'sonner';

// Single config list for keys and labels
const limitConfigs = [
  { key: 'no_contact_lists', label: 'No Contact Lists' },
  { key: 'download_export', label: 'Download & Export' },
  { key: 'tags_types', label: 'Tags & Types' },
  { key: 'credit', label: 'Credits' },
  { key: 'magic_search', label: 'Domain Search' },
  { key: 'personality_intel', label: 'Personality Intel' },
  { key: 'zbizlocator', label: 'Local Search' },
];

/**
 * Ensure each limit’s total allocation (excluding non‑editable/unallocated rows)
 * does not exceed 100%.
 *
 * @param {Array} _ignored - original data (unused)
 * @param {Array} updatedRows - array of row objects with updated .limits
 * @returns {Boolean} true if all sums ≤ 100, false (and toasts) otherwise
 */
export const checkCreditSumLimits = (_ignored, updatedRows) => {
  // Sum each key across filtered rows
  const sums = updatedRows
    .filter(({ isNonEditable, name }) => !isNonEditable && name !== 'Unallocated credits')
    .reduce((acc, { limits }) => {
      limitConfigs.forEach(({ key }) => {
        const value = Number(limits[key]) || 0;
        acc[key] = (acc[key] || 0) + value;
      });
      return acc;
    }, {});

  // Identify keys exceeding 100%
  const exceeded = limitConfigs.filter(({ key }) => (sums[key] || 0) > 100);
  if (exceeded.length) {
    const details = exceeded.map(({ key, label }) => `${label} (${sums[key]}%)`);
    toast.error(`The following limits exceed 100%: ${details.join(', ')}.`);
    return false;
  }

  return true;
};
