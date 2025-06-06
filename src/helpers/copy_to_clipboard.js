import { toast } from 'sonner';
import { isBrowser } from './isBrowser';

/**
 * This function copies the given text to the clipboard
 * and displays a success toast message if executed in a browser environment.
 * @param {string} text The text to be copied to the clipboard.
 * @param {string} type The type of data being copied (e.g., "Email"). Default value is "Email".
 * @returns {boolean} Returns true if copying was successful, false otherwise
 */
export function copy_to_clipboard(text, type = 'Email') {
  if (!isBrowser()) return false;

  try {
    // Modern browsers
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text);
      toast.success(`${type} copied to clipboard`);
      return true;
    }

    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const success = document.execCommand('copy');
    textArea.remove();

    if (success) {
      toast.success(`${type} copied to clipboard`);
      return true;
    } else {
      toast.error('Failed to copy to clipboard');
      return false;
    }
  } catch (error) {
    toast.error('Failed to copy to clipboard');
    return false;
  }
}
