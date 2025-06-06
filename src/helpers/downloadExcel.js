import { toast } from 'sonner';
import { utils, writeFile } from 'xlsx';

/**
 * Downloads data as an Excel (.xlsx) file.
 *
 * @param {string} filename - The name of the output Excel file.
 * @param {object} data - Data to be written into the Excel file.
 * @returns {void}
 */
export const downloadExcel = (filename, data) => {
  // Check if there is any data to write to the Excel file
  if (Object.keys(data).length === 0) {
    return;
  }
  // Create a new Workbook
  const wb = utils.book_new();
  // Name your sheet
  Object.keys(data).map((key, index) => {
    // Ensure the sheet name does not exceed 31 characters
    const safeKey = key.length > 31 ? key.slice(0, 28) + `_${index}` : key;

    const binaryWS = utils.json_to_sheet(data[key]); // Convert data to a worksheet
    utils.book_append_sheet(wb, binaryWS, safeKey); // Append the worksheet to the workbook
  });
  // Export your excel
  let final_filename = filename.trim().replace('.xlsx', '') + '.xlsx';
  // Write the workbook to a file with the final filename
  writeFile(wb, final_filename);
  // Display a success toast message
  toast.success('Downloaded file successfully');
};
