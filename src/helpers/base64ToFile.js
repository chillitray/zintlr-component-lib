/**
 * Detects the MIME type of a given base64 encoded string.
 * @param {string} b64 - The base64 encoded string to detect the MIME type for.
 * @returns {string|undefined} - The detected MIME type, or undefined if no match is found.
 */
function detectMimeType(b64) {
  //Contains base64 signatures and their corresponding MIME types
  const signatures = {
    JVBERi0: 'application/pdf',
    R0lGODdh: 'image/gif',
    R0lGODlh: 'image/gif',
    iVBORw0KGgo: 'image/png',
    AAAA: 'video/mp4',
    '/': 'image/jpg',
    i: 'image/png',
    R: 'image/gif',
    U: 'image/webp',
    J: 'application/pdf',
    A: 'video/mp4',
    UEsDBBQA: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;',
  };

  for (const s in signatures) {
    const i = b64.indexOf(s);
    // Checking if the signature is found at the beginning of the base64 string
    if (i === 0 || i === 1) {
      // Returning the corresponding MIME type
      return signatures[s];
    }
  }
}

/**
 * Converts a base64 encoded string to a data URL with the appropriate MIME type.
 * @param {string} s - The base64 encoded string to convert.
 * @returns {string|undefined} - The data URL representing the input with detected MIME type, or undefined if detection fails.
 */
export function fromBase64ToFile(s) {
  // Constructing the data URL using the detected MIME type and the input base64 string
  const final = 'data:' + detectMimeType(s) + ';base64,' + s;
  return final;
}
