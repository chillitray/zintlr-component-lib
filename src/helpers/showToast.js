import { toast } from 'react-toastify';

/**
 * Shows a toast notification with the specified message and type
 * @param {string} message - The message to display in the toast
 * @param {('success'|'error'|'info'|'warning')} type - The type of toast to show
 * @param {object} options - Additional options for the toast
 */
const showToast = (message, type = 'success', options = {}) => {
  const defaultOptions = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...options
  };

  switch (type) {
    case 'success':
      toast.success(message, defaultOptions);
      break;
    case 'error':
      toast.error(message, defaultOptions);
      break;
    case 'info':
      toast.info(message, defaultOptions);
      break;
    case 'warning':
      toast.warning(message, defaultOptions);
      break;
    default:
      toast(message, defaultOptions);
  }
};

export default showToast; 