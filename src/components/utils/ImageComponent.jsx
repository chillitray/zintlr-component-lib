import { createImg } from '../../helpers';
import NextImage from 'next/image';
import { useEffect, useMemo, useState } from 'react';

/**
 * ImageComponent is a custom image component that handles lazy loading and fallback rendering.
 *
 * @typedef {Object} ImageComponentProps
 * @property {string} src - The source URL of the image
 * @property {number} width - The width of the image
 * @property {number} height - The height of the image
 * @property {string} alt - The alternative text for the image
 * @property {string} [className=""] - Additional CSS class names for the component
 * @property {string} id - The HTML id attribute for the component
 * @property {string} layout =>  - The layout strategy for the image (default is "intrinsic")
 * @property {(e: React.MouseEvent) => void} [onClick=()=>{}] - Click event handler for the image
 * @property {boolean} [priority=false] - Flag indicating whether the image should be loaded with priority
 * @property {string} [objectFit="cover"] - The CSS object-fit property value for the image
 * @property {string} [objectPosition="center"] - The CSS object-position property value for the image
 * @property {string|null} [bgColor=null] - Background color for the alternate image created using alternate text
 * @property {() => void} [onLoadingComplete=()=>{}] - Callback function executed when image loading completes
 */

const ImageComponent = ({
  src,
  width,
  height,
  alt,
  className = '',
  id = '',
  layout = 'intrinsic',
  objectFit = 'cover',
  objectPosition = 'center',
  priority = false,
  bgColor = null,
  onClick = () => {},
  onLoadingComplete = () => {},
}) => {
  // State to hold the image source URL.
  const [image, setImage] = useState(src);

  // State to track if image is loaded
  const [isLoaded, setIsLoaded] = useState(false);

  // Generate alternate description text, defaulting to "Zintlr"
  const alternateDP = useMemo(() => {
    return alt || 'Zintlr';
  }, [alt]);

  // Load the image and handle fallbacks if loading fails.
  useEffect(() => {
    // Flag to track if the component is unmounted.
    let unmounted = false;
    // Determine the source URL for the image.
    let src_url = src;
    if (!src) {
      //If src is not defined, create svg image using the alternate text and given background color
      src_url = createImg(alt || alternateDP, bgColor);
    }
    if (!unmounted) {
      setImage(src_url);
      setIsLoaded(false);
    }
    // Cleanup function to prevent memory leaks.
    return () => {
      unmounted = true;
    };
  }, [src, bgColor, alt, alternateDP]);

  return (
    <div className="relative">
      {/* Blur placeholder - shown while image is loading */}
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-gray-200 animate-pulse rounded"
          style={{
            width: width,
            height: height,
            background:
              bgColor ||
              'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
          }}
        />
      )}

      <NextImage
        src={image || createImg(alternateDP, bgColor)}
        width={width}
        height={height}
        alt={alt}
        className={`select-none drag-none transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        loading={!priority ? 'lazy' : 'eager'}
        objectFit={objectFit}
        objectPosition={objectPosition}
        layout={layout}
        id={id}
        onClick={e => {
          onClick(e);
        }}
        priority={priority}
        onError={() => {
          //On error while loading image, create a fallback image using the alternate text
          setImage(createImg(alternateDP, bgColor));
        }}
        onLoadingComplete={_e => {
          setIsLoaded(true);
          onLoadingComplete();
        }}
      />

      {/* CSS for shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
};

export { ImageComponent };
