import { useState, useEffect } from 'react';

// Moved the function to the root level
function getSize() {
  if (typeof window !== 'undefined') {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }
  return {
    width: undefined,
    height: undefined,
  };
}

/**
 * To get width and height of the screen, use this hook
 * This custom hook tracks the window size and updates the state with the current width and height.
 * @returns {Object} An object containing the width and height of the window.
 */
export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState(getSize());

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleResize = () => {
      setWindowSize(getSize());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
