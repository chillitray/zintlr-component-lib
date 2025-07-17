import React, { useMemo } from 'react';
import { isBrowser } from '../helpers/isBrowser';
import { TypeAnimation } from 'react-type-animation';

const waitTime = 1000;

/**
 * TypingAnimationDiv is a React component that displays a typing animation using the react-type-animation library or a plain text representation when not viewed in a browser.
 *
 * array_of_texts An array of texts to be displayed in the typing animation. Each element in the array represents a text to be shown, and the elements at even indexes are texts while elements at odd indexes represent wait time (in milliseconds) between the texts.
 * It returnsThe rendered React node representing the component.
 */
function TypingAnimationDiv({ array_of_texts = [] }) {
  // Create a memoized version of the 'texts' array by interleaving the 'array_of_texts' with wait times.
  const texts = useMemo(() => {
    const retured_text = [];
    array_of_texts.map((item) => {
      retured_text.push(item);
      retured_text.push(waitTime);
    });
    return retured_text;
  }, [array_of_texts]);
  return (
    <>
      {/* Check if the code is running in a browser or not */}
      {isBrowser() ? (
        // If in a browser, use the 'TypeAnimation' component from react-type-animation to display the typing animation.
        <TypeAnimation
          sequence={texts}
          wrapper="span"
          cursor={true}
          speed={0.5}
          repeat={Infinity}
        />
      ) : (
        // If not in a browser, (for server side rendering and SEO), display the concatenated 'array_of_texts' as plain text.
        <p>{array_of_texts.join(',')}</p>
      )}
    </>
  );
}

export default TypingAnimationDiv;
