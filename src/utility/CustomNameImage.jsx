import React from 'react';

const CustomNameImage = ({ name, circle = true, className = '' }) => {
  // Split the name into parts
  const nameParts = name.split(' ');
  // Get the first letter of the first part and the first letter of the last part
  const initials = nameParts[0][0].toUpperCase() + nameParts[nameParts.length - 1][0].toUpperCase();

  const baseClasses = `flex items-center justify-center bg-black text-white min-w-8 min-h-8 text-md font-bold uppercase`;
  const shapeClass = circle ? 'rounded-full' : 'rounded-none';

  return <div className={`${baseClasses} ${shapeClass} ${className}`}>{initials}</div>;
};

export default CustomNameImage;
