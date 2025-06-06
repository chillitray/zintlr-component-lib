import { read, utils } from 'xlsx';

/**
 * This function reads any Excel or CSV from user import
 * @param {File} file - The Excel/CSV file to be read.
 * @param {Function} callback - Function to call when file has been read
 *
 * Callback has the array of objects from the file
 */
export const readExcelCSV = (file, callback = () => {}) => {
  if (file) {
    const reader = new FileReader();
    //If the readAsBinaryString function available in the browser
    if (reader.readAsBinaryString) {
      reader.onload = function (e) {
        callback(GetTableFromExcel(e.target.result));
      };
      reader.readAsBinaryString(file);
    } else {
      //For IE Browser.
      reader.onload = function (e) {
        var data = '';
        var bytes = new Uint8Array(e.target.result);
        for (let i = 0; i < bytes.byteLength; i++) {
          data += String.fromCharCode(bytes[i]);
        }
        callback(GetTableFromExcel(data));
      };
      reader.readAsArrayBuffer(file);
    }
  }
};

function GetTableFromExcel(data) {
  //Read the Excel File data in binary
  const workbook = read(data, {
    type: 'binary',
  });

  //get the name of First Sheet.
  const Sheet = workbook.SheetNames[0];

  //Read all rows from First Sheet into an JSON array.
  const excelRows = utils.sheet_to_row_object_array(workbook.Sheets[Sheet]);

  return excelRows;
}
