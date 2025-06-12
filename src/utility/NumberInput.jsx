import React from 'react';

/**
 * Reusable NumberInput component.
 * Ensures proper number input handling while preventing leading zeros.
 *
 * @param {object} props - Component props.
 * @param {string|number} props.value - The current input value.
 * @param {function} props.onChange - Function to handle input changes.
 * @param {function} props.onBlur - Function to handle blur event.
 * @param {function} [props.onKeyDown] - Function to handle keydown event.
 * @param {number} props.max - Maximum allowed value.
 * @param {number} [props.min=0] - Minimum allowed value (default is 0).
 * @param {string} [props.className] - Additional class names.
 * @param {boolean} [props.autoFocus=false] - Auto-focus the input on mount.
 * @param {string} [props.ariaLabel="Number input"] - Accessibility label.
 * @param {object} rest - Additional props.
 */
const NumberInput = ({
  value,
  onChange,
  onBlur,
  onKeyDown,
  max,
  min = 0,
  className = '',
  autoFocus = false,
  ariaLabel = 'Number input',
  ...rest
}) => {
  const handleChange = (e) => {
    const inputValue = e.target.value.replace(/^0+/, '');

    // Allow empty input for better user experience
    if (inputValue === '') {
      onChange({ target: { value: '' } });
      return;
    }

    const numericValue = Number(inputValue);
    if (!isNaN(numericValue) && numericValue >= min && numericValue <= max) {
      onChange({ target: { value: numericValue.toString() } });
    }
  };

  const handleBlur = (e) => {
    let numericValue = Number(e.target.value);
    numericValue = isNaN(numericValue) ? min : Math.min(Math.max(numericValue, min), max);
    onBlur({ target: { value: numericValue.toString() } });
  };

  return (
    <input
      type="text" // Prevents browser auto-formatting leading zeros
      className={`w-12 text-center border rounded-sm px-1 focus:border-blue-500 focus:outline-none ${className}`}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={onKeyDown}
      autoFocus={autoFocus}
      aria-label={ariaLabel}
      {...rest}
    />
  );
};

export default NumberInput;
