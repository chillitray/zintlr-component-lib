import { isBrowser } from './isBrowser';

// Scroll behavior options.
const scrollOptions = {
  behavior: 'smooth',
  block: 'center',
  inline: 'nearest',
};

/**
 * Scrolls to the element with the specified 'id'.
 * @param {string} id - The id of the element to scroll to.
 */
const scrollById = id => {
  // Define an interval that runs every 200 milliseconds.
  const interval = setInterval(() => {
    // Attempt to retrieve the element with the given 'id'.
    const element = document.getElementById(id);
    if (element) {
      // If the element is found, clear the interval to stop checking.
      clearInterval(interval);
      // Scroll the element into view with the specified scroll behavior options.
      element.scrollIntoView(scrollOptions);
    }
  }, 200);
};

/**
 * Scrolls to the element indicated by the 'href' attribute of the event target.
 * @param {Event} e - The event triggered when calling the function.
 */
const scrollTo = e => {
  // Check if the code is running in a browser environment.
  if (isBrowser()) {
    // Prevent the default action of the event (e.g., following a link).
    e.preventDefault();
    // Find the element based on the 'href' attribute of the event target.
    const doc = document.querySelector(e.target.getAttribute('href'));
    // Scroll the element into view with the specified scroll behavior options.
    doc.scrollIntoView(scrollOptions);
  }
};
export { scrollById, scrollTo };
