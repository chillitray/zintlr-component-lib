import React, { useState } from 'react';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';

const styles = {
  label: 'text-sm font-semibold block w-full mb-2',
  inputWrapper: 'block w-full p-2 bg-white border rounded-md outline-0 shadow-4xl',
};

/**
 * A customizable password input field
 * This component renders an input field for entering passwords,
 * allowing the user to show/hide the password visibility.
 *
 * label - The label text for the input field.
 * name - The name attribute for the input field.
 * placeholder - The placeholder text for the input field.
 * eleRef - A reference to the input element.
 * inputContainerClassName - Additional class name for the input container.
 *
 * it also accepts other input arguments to pass them into input tag
 */
function PasswordInputField({
  label = '',
  name = '',
  placeholder = '',
  eleRef = null,
  inputContainerClassName = '',
  isRequired = false,
  ...args
}) {
  // State to manage password visibility
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full mt-2">
      {/* Label for the input */}
      <label htmlFor={name} className={styles.label}>
        {label}
        <span className="text-red-500 font-bold">{isRequired && '*'}</span>
      </label>
      <div
        className={`flex flex-row items-center justify-between read-only:bg-white ${styles.inputWrapper} ${inputContainerClassName}`}
      >
        {/* Password input field */}
        <input
          required
          minLength="6"
          maxLength="50"
          name={name}
          id={name}
          placeholder={placeholder}
          ref={eleRef}
          type={showPassword ? 'text' : 'password'}
          className="outline-0 bg-transparent w-11/12"
          {...args}
        />

        {/* Button to toggle password visibility */}
        <button
          tabIndex="-1"
          className="bg-white border-0 outline-0 p-1 w-6"
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {/* Eye icon for password visibility */}
          {!showPassword ? (
            <BsEyeSlashFill className="text-gray-400 w-4 h-4" />
          ) : (
            <BsEyeFill className="text-gray-400 w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}

export default PasswordInputField;
