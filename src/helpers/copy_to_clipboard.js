import { toast } from 'sonner';
import { isBrowser } from './isBrowser';

/**
 * This function copies the given text to the clipboard
 * and displays a success toast message if executed in a browser environment.
 * @param {string} text The text to be copied to the clipboard.
 * @param {string} type The type of data being copied (e.g., "Email"). Default value is "Email".
 * @returns {void} This function does not return anything.
 */
export const copy_to_clipboard = (text, type = 'Email') => {
  if (isBrowser()) {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard`);
  }
};

