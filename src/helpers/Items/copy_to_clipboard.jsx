import { toast } from 'react-toastify';
import isBrowser from './isBrowser';

/**
 * This function copies the given text to the clipboard
 * and displays a success toast message if executed in a browser environment.
 * @param {string} text The text to be copied to the clipboard.
 * @param {string} type The type of data being copied (e.g., "Email"). Default value is "Email".
 * @returns {void} This function does not return anything.
 */
const copy_to_clipboard = (text, type = 'Email') => {
  if (isBrowser()) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success(`${type} copied to clipboard`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .catch(() => {
        toast.error('Failed to copy to clipboard', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      });
  }
};

export default copy_to_clipboard;
