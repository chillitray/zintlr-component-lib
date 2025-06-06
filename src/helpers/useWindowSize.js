import { useState, useCallback, useEffect } from 'react';
import isBrowser from '../../helpers/isBrowser';

/**
 * To get width and height of the screen, use this hook
 * This custom hook tracks the window size and updates the state with the current width and height.
 * @returns {Object} An object containing the width and height of the window.
 */
const useWindowSize = () => {
  // State to hold the current window size
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  // Handler to be called on window resize
  const handleResize = useCallback(() => {
    // Set window width/height to state
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, [setWindowSize]);

  useEffect(() => {
    // Check if the code is running in a browser environment
    if (isBrowser) {
      // Add event listener for window resize events
      window.addEventListener('resize', handleResize);

      // Call the handler right away to update state with the initial window size
      handleResize();

      // Remove the event listener on cleanup to avoid memory leaks
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [handleResize]);

  // Return the current window size
  return windowSize;
};

export default useWindowSize;
