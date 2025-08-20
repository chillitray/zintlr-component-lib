import { useState, useEffect } from 'react';
import { isBrowser } from './isBrowser';

/**
 * To get width and height of the screen, use this hook
 * This custom hook tracks the window size and updates the state with the current width and height.
 * @returns {Object} An object containing the width and height of the window.
 */
function useWindowSize() {
  // State to hold the current window size
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Check if the code is running in a browser environment
    if (isBrowser()) {
      // Handler to be called on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      // Add event listener for window resize events
      window.addEventListener('resize', handleResize);

      // Call the handler right away to update state with the initial window size
      handleResize();

      // Remove the event listener on cleanup to avoid memory leaks
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []); // Empty array ensures that the effect is only run on mount

  // Return the current window size
  return windowSize;
}
export { useWindowSize };
