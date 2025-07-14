import React, { useEffect, useMemo, useState } from 'react';
import NextImage from 'next/image';
import useNextBlurhash from 'use-next-blurhash';
import { createImg } from '../helpers/create_img';

/**
 * ImageComponent is a custom image component that handles lazy loading and fallback rendering.
 *
 * src - The source URL of the image.
 * width - The width of the image.
 * height - The height of the image.
 * alt - The alternative text for the image.
 * className - Additional CSS class names for the component.
 * id - The HTML id attribute for the component.
 * layout - The layout strategy for the image (default is "intrinsic").
 * onClick - Click event handler for the image (default is an empty function).
 * priority - Flag indicating whether the image should be loaded with priority.
 * objectFit - The CSS object-fit property value for the image (default is "cover").
 * objectPosition - The CSS object-position property value for the image (default is "center").
 * bgColor - Background color for the alternate image created using alternate text (default is null).
 * It returns- JSX element to render the image or alternative text if not in view or not a priority.
 */
function ImageComponent({
  src,
  width,
  height,
  alt,
  className = '',
  id,
  layout,
  onClick = () => {},
  priority = false,
  objectFit = 'cover',
  objectPosition = 'center',
  bgColor = null,
  blurEffect = true,
  onLoadingComplete = () => {},
}) {
  // State to hold the image source URL.
  const [image, setImage] = useState(src);

  // State to hold the data URL for blurred image (for lazy loading).
  const [blurDataUrl, setData] = useState(null);

  // Generate alternate description text, defaulting to "Zintlr"
  const alternateDP = useMemo(() => {
    return alt || 'Zintlr';
  }, [alt]);

  // Retrieve blurhash data using use-next-blurhash package
  // It returns the blur image data url
  var [data] = useNextBlurhash('LALp{do00HWT_Ne:a~WV0Yf+M{n%');

  // Set the blurhash data to the state for blurred image.
  useEffect(() => {
    if (blurEffect) setData(data);
    // eslint-disable-next-line
  }, [blurEffect]);

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
    if (!unmounted) setImage(src_url);
    // Cleanup function to prevent memory leaks.
    return () => {
      unmounted = true;
    };
  }, [src, bgColor, alt, alternateDP]);

  return (
    <NextImage
      src={image || createImg(alternateDP, bgColor)}
      width={width}
      height={height}
      alt={alt}
      className={'select-none drag-none ' + className}
      loading={!priority ? 'lazy' : 'eager'}
      objectFit={objectFit}
      objectPosition={objectPosition}
      layout={layout || 'intrinsic'}
      placeholder={blurDataUrl ? 'blur' : ''}
      blurDataURL={blurDataUrl ? blurDataUrl : ''}
      id={id}
      onClick={(e) => {
        onClick(e);
      }}
      priority={priority}
      onError={() => {
        //On error while loading image, create a fallback image using the alternate text
        setImage(createImg(alternateDP, bgColor));
      }}
      onLoadingComplete={(e) => {
        onLoadingComplete(e);
        setData('');
      }}
    />
  );
}

export default ImageComponent;
