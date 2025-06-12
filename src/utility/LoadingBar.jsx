import React, { useEffect, useState } from 'react';

/**
 * LoaderBar is a custom button component that supports a loading state and a disabled state.
 * It displays a loading bar when isLoading is true; otherwise, it shows the provided text.
 * @param {string} text - The text to be displayed on the button.
 * @param {boolean} isLoading - Indicates whether the button is in a loading state.
 * @returns {JSX.Element} - The LoaderBar component's JSX representation.
 */
const LoadingBar = ({ text = '', isLoading = false }) => {
  const [progress, setProgress] = useState(0);

  // useEffect to update the progress bar
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 1;
          return newProgress >= 100 ? 100 : newProgress;
        });
      }, 100); // Increased speed for the smooth transition

      return () => clearInterval(interval); // Cleanup the interval
    }
    1;
  }, [isLoading]);

  return (
    <>
      <p className="text_18_600 my-4">{text}</p>
      {isLoading && (
        <div className="w-1/3 h-3 bg-[#F0F0F0] rounded-full">
          <div
            className="h-full bg-[#FFA300] rounded-full"
            style={{
              width: `${progress}%`,
              transition: 'width 0.5s ease-in-out', // Smooth transition effect
            }}
          ></div>
        </div>
      )}
    </>
  );
};

export default LoadingBar;
