import React from 'react';
import Spinner from './Spinner';

/**
 * LoadingButton is a custom button component that supports a loading state and a disabled state.
 * It displays a spinner when loading is true; otherwise, it shows the provided text.
 * props - The properties for the LoadingButton component.
 * props.text - The text to be displayed on the button.
 * props.isLoading - Indicates whether the button is in a loading state.
 * props.isDisabled - Indicates whether the button is disabled.
 * props.className - Additional CSS classes to be applied to the button.
 * props.onClick - The click event handler function for the button.
 * It returnsThe LoadingButton component's JSX representation.
 */
function LoadingButton({
  text = '',
  isLoading = false,
  isDisabled = false,
  className = '',
  bgColor = 'bg-gradBlack2',
  onClick = () => {},
  loaderClassName = '',
}) {
  return (
    <button
      type="submit"
      disabled={isLoading || isDisabled}
      // The reason for checking "bg-" is that bg-gradBlack2 is a background image,
      // and if you try to apply any background color,
      // it won't prioritize the color.
      className={`
				w-full  rounded-lg relative text-white text-base p-2 mt-5 
				border-0 outline-0 disabled:bg-gray-200 disabled:bg-none
				${className} ${bgColor}
			`}
      onClick={onClick}
    >
      {!isLoading && text}
      <div className={`min-w-[100px]  flex items-center justify-center ${loaderClassName}`}>
        {isLoading && <Spinner size="6" colorClass="" />}
      </div>
    </button>
  );
}

export default LoadingButton;
