import { toast } from 'sonner';

/**
 * Downloads an array of data as a CSV file and displays a success toast.
 * @param {string} filename - The desired name for the downloaded file.
 * @param {Array} array - An array of objects containing the data to be downloaded.
 * @returns {void}
 */
export default (filename, array) => {
  // Convert each object in the array to an array of its values
  const csv = array.map((row) => Object.values(row));

  // Insert the keys of the first object as the header row at the beginning of the CSV
  csv.unshift(Object.keys(array[0]));

  // Join the CSV array using line breaks
  const csvArray = csv.join('\r\n');

  // Create a new anchor element to trigger the download
  const a = document.createElement('a');

  // Set the href attribute to encode the CSV data
  a.href = 'data:attachment/csv,' + encodeURIComponent(csvArray);

  // Open the download in a new tab/window
  a.target = '_blank';

  // Set the suggested filename for the downloaded file
  a.download = filename;

  // Simulate a click on the anchor element to trigger the download
  a.click();

  // Display a toast indicating successful file download
  toast.success('Downloaded file successfully');
};
