import React, { useMemo, useState } from 'react';

/**
 * ReadMoreComp is a React component that truncates text and provides a "Read More" link to expand it.
 * props - The props object that contains the following properties:
 * props.paragraphToShow - The input text to be truncated.
 * props.max_length - The maximum length of the text to show before truncating.
 * It returns- The JSX representation of the TruncatedText component.
 */
const ReadMoreComp = ({ paragraphToShow, max_length, isDisable = false }) => {
  // State to keep track of whether to show the full text or truncated text.
  const [readMore, setReadMore] = useState(false);

  // Calculate the text to show based on the readMore state and the maximum length.
  const paragraph = useMemo(() => {
    //if read more is true or length of paragraph is already less than max length, show whole paragraph
    if (readMore || (paragraphToShow?.length ?? 0) < max_length) return paragraphToShow;
    //Else get the substring
    return paragraphToShow?.substring(0, max_length) + '...';
  }, [paragraphToShow, readMore, max_length]);

  return paragraphToShow ? (
    <>
      {/* Display the truncated or full text */}
      {paragraph}
      {/* Show the "Show More" link only if the text length exceeds the maximum length */}
      &nbsp;
      {paragraphToShow.length >= max_length && (
        <a
          href="#!"
          aria-label="Show More"
          onClick={(e) => {
            if (isDisable) {
              e.preventDefault();
              return;
            }
            setReadMore(!readMore);
          }}
          className="text-iris font-normal text_14_500  leading-5 cursor-pointer"
        >
          Know {!readMore ? 'More' : 'Less'}
        </a>
      )}
    </>
  ) : (
    <></>
  );
};

export default ReadMoreComp;
