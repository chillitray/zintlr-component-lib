import React from 'react';
import { createRoot } from 'react-dom/client';
import Toast from '../../components/Toast/Toast';
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
    navigator.clipboard.writeText(text);
    const toastElement = document.createElement('div');
    document.body.appendChild(toastElement);

    const handleClose = () => {
      document.body.removeChild(toastElement);
    };

    const toastProps = {
      message: `${type} copied to clipboard`,
      type: 'success',
      duration: 3000,
      position: 'top-right',
      onClose: handleClose,
    };

    const root = createRoot(toastElement);
    root.render(<Toast {...toastProps} />);
  }
};

export default copy_to_clipboard;
