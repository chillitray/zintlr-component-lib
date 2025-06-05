import { useState, useEffect } from 'react';
/**
 * This custom hook is used to track whether an element is currently visible on the screen
 * (in the viewport).
 * @param {React.MutableRefObject} ref A ref that points to the element to be observed
 * for visibility.
 * @returns {boolean} A boolean value representing whether the observed element is
 * currently visible on the screen.
 */
const useOnScreen = (ref) => {
  // State to keep track of whether the element is intersecting the viewport.
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    // Create a new IntersectionObserver instance.
    const observer = new IntersectionObserver(([entry]) => {
      // When the intersection state changes and the element becomes visible on the screen,
      // update the isIntersecting state to true.
      if (!isIntersecting) setIntersecting(entry.isIntersecting);
    });

    // Check if the ref is available and the element is not yet intersecting.
    // If both conditions are true, start observing the element.
    if (ref.current && !isIntersecting) {
      observer.observe(ref.current);
    } else {
      // If the element is already intersecting or the ref is not available, stop observing the element.
      observer.unobserve(ref.current);
    }

    // Clean up the observer when the component is unmounted or the state isIntersecting changes.
    return () => {
      observer.disconnect();
    };
  }, [isIntersecting, ref]);

  // Return the boolean value indicating whether the element is currently visible on the screen.
  return isIntersecting;
};

export default useOnScreen;
