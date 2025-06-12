import React, { useCallback, useEffect, useRef } from 'react';

/**
 * This component captures clicks outside the given children area.
 * When a click occurs outside the given children area, it triggers a callback function.
 * onClickOutside - Callback function to be executed on outside click
 * children - The content within which outside clicks are detected
 */
function CheckOutsideClick({ onClickOutside, children }) {
  // Create a reference for parent component on the children
  const ref = useRef(null);

  // Define a callback function to handle outside clicks
  const outsideClickHandler = useCallback(
    (event) => {
      // Check if the clicked target is outside the given children area
      if (ref.current && !ref.current.contains(event.target) && onClickOutside) {
        // Execute the onClickOutside callback if provided
        onClickOutside();
      }
    },
    [onClickOutside]
  );

  // Attach an event listener to the document for outside clicks
  useEffect(() => {
    document.addEventListener('click', outsideClickHandler, true);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', outsideClickHandler, true);
    };
  }, [outsideClickHandler]);

  // Render an empty fragment if no children are provided
  if (!children) {
    return <></>;
  }

  // Render a wrapping div around the provided children with a ref
  return <div ref={ref}>{children}</div>;
}

export default CheckOutsideClick;
