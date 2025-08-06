import NextImage from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import {
  imageKitURL,
  WEBSITE_NAME,
  placeholderDataURL,
} from '../../constants/image-constant';
import { createDP } from '../../helpers';

/**
 * ImageComponent is a custom image component that handles lazy loading and fallback rendering.
 *
 * @param {string|object} src - The source URL or object containing 'url' and 'alt' properties for the image.
 * @param {number} width - The width of the image.
 * @param {number} height - The height of the image.
 * @param {string} alt - The alternative text for the image.
 * @param {string} className - The additional CSS class name for the image container.
 * @param {string} id - The unique identifier for the image element.
 * @param {string} layout - The layout behavior for the image. Default is "intrinsic".
 * @param {Function} onClick - The callback function to be triggered on image click.
 * @param {boolean} priority - If true, the image will be eagerly loaded. Default is false.
 * @param {string} objectFit - The object-fit CSS property for the image. Default is "contain".
 * @param {boolean} createIfError - If true, a default image will be created if the original image fails to load. Default is false.
 * @param {Function} onLoadingComplete - The callback function to be triggered when the image loading is complete.
 *
 * @returns {React.ReactNode} - JSX element to render the image or alternative text if not in view or not a priority.
 */
const LandingImageComponent = ({
  src,
  width,
  height,
  alt,
  className = '',
  id,
  layout,
  onClick = () => {},
  priority = false,
  objectFit = 'contain',
  createIfError = false,
  onLoadingComplete = () => {},
}) => {
  // Component state to store the actual image URL.
  const [image, setImage] = useState(undefined);

  // Memoized local_src to handle imageKitURL conversion or use the original source.
  const local_src = useMemo(() => {
    const lc_src = typeof src === 'object' ? imageKitURL(src.url) : src;
    return lc_src;
  }, [src]);

  // Memoized local_alt to handle alt text from the object or use the provided alt prop.
  const local_alt = useMemo(() => {
    return typeof src === 'object' ? src.alt : alt;
  }, [src, alt]);

  // Set the image state when the local_src changes.
  useEffect(() => {
    setImage(local_src);
  }, [local_src]);

  // Create a default image if there's an error loading the original image.
  useEffect(() => {
    if (createIfError) {
      let unmounted = false;
      let src_url = local_src;
      if (!local_src) {
        src_url = createDP(local_alt || WEBSITE_NAME);
      }
      const newImg = new Image();
      newImg.onload = function () {
        if (!unmounted) setImage(src_url);
      };
      newImg.onerror = function () {
        if (!unmounted) setImage(createDP(local_alt || WEBSITE_NAME));
      };
      newImg.src = src_url;
      return () => {
        unmounted = true;
      };
    }
  }, [local_src, local_alt, createIfError]);

  // Render the NextImage component with the appropriate props if toShow is true, otherwise render the alternative text.
  return (
    <NextImage
      src={image || local_src || createDP(alt || WEBSITE_NAME)}
      width={width}
      height={height}
      alt={local_alt}
      className={`${className}`}
      loading={!priority ? 'lazy' : 'eager'}
      objectFit={objectFit}
      layout={layout || 'intrinsic'}
      placeholder={width >= 40 && 'blur'}
      blurDataURL={placeholderDataURL}
      id={id}
      onClick={e => {
        onClick(e);
      }}
      priority={priority}
      onLoadingComplete={e => {
        onLoadingComplete(e);
      }}
    />
  );
};

export { LandingImageComponent };
