import React from 'react';
import Switch from 'react-switch';

const PurpleSwitch = ({ selectedState, handleChange, disabled = false }) => {
  const checkedState = selectedState === 1 ? true : false;
  return (
    <Switch
      checked={checkedState}
      onChange={() => handleChange()}
      checkedIcon={false}
      uncheckedIcon={false}
      onColor="#7879F1"
      offColor="#DEDEE7"
      height={21}
      width={40}
      disabled={disabled}
      boxShadow={selectedState ? 'none' : '0 0 0 0 transparent'}
      handleDiameter={16}
      activeBoxShadow="0 0 0 0 transparent" // Prevent active shadow
    />
  );
};

export default PurpleSwitch;
