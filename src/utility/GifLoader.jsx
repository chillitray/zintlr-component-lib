import { useEffect, useState } from 'react';
import ImageComponent from './ImageComponent';

/**
 * GifLoader component displays an image initially and then loads a GIF after a delay.
 * It uses ImageComponent to load and display images.
 * @param {string} imgUrl The URL of the initial image to be displayed.
 * @param {string} gifUrl The URL of the GIF to be loaded after a delay.
 * @param {string} gif_alt The alt text for the GIF image.
 * @param {number} height The height of the image/GIF.
 * @param {number} width The width of the image/GIF.
 * @param {string} className Additional CSS class name for styling.
 * @param {boolean} priority If true, the image/GIF is loaded with higher priority (default: false).
 * @returns {React.ReactNode}
 */
// { imgUrl, gifUrl, gif_alt, height, width, className, priority = false }
const GifLoader = (options) => {
  // gifLoaded state: Tracks if the GIF has finished loading.
  const [gifLoaded, setGifLoaded] = useState(false);

  // tme state: Used to control the timing of GIF loading.
  const [tme, setTme] = useState(false);

  // handleGifLoad function: Called when the GIF has finished loading.
  const handleGifLoad = () => {
    setGifLoaded(true);
  };

  useEffect(() => {
    // Gifs will start loading after 2 secs (1500 milliseconds in this case).
    const timeout = setTimeout(() => {
      setTme(true);
    }, 1500);

    // Cleanup function to clear the timeout when the component unmounts.
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      {/* Initially display the image */}
      <div className={`${!gifLoaded ? 'block' : 'hidden'}`}>
        <ImageComponent src={options?.src} {...options} />
      </div>
      {/* Load and display the GIF after the delay */}
      {tme && (
        <div className={`${gifLoaded ? 'block' : 'hidden'}`}>
          <ImageComponent
            src={options?.gifUrl}
            alt={options?.gif_alt}
            objectFit
            onLoadingComplete={handleGifLoad}
            {...options}
          />
        </div>
      )}
    </>
  );
};

export default GifLoader;
