import React from 'react';

/**
 * A React component that displays a "Show More" link at the end of some items.
 * e.g. See more employees
 * text - The text to be displayed
 * seeMoreClick - The callback function to be executed when the "Show More" link is clicked.
 * It returns- Returns the JSX element representing the "Show More" component.
 */
const SeeMoreComp = ({ text, seeMoreClick = () => {} }) => {
  return (
    <>
      <div className="w-full flex flex-row items-center justify-center ">
        <a className="cursor-pointer border rounded-lg px-3 py-1 shadow-lg" onClick={seeMoreClick}>
          <p className="text-iris80 text-base font-normal flex  my-1 mx-2">{text}</p>
        </a>
      </div>
    </>
  );
};

export default SeeMoreComp;
