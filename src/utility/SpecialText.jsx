import React from 'react';

const SpecialText = ({ text, isPurpule = false, isBold, className }) => {
  // Use a regular expression to find text between "\b" and apply bold style
  const newText = text.split('\b').map((chunk, index) =>
    index % 2 === 1 ? (
      isPurpule ? (
        <span className={`text-iris80 ${isBold && 'font-semibold'} ${className}`} key={index}>
          {chunk}
        </span>
      ) : (
        <strong key={index} className={className}>
          {chunk}
        </strong>
      )
    ) : (
      chunk
    )
  );

  return <>{newText}</>;
};

export default SpecialText;
