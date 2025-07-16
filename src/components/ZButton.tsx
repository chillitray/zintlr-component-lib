import React from 'react';

interface ZButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
}
const ZButton: React.FC<ZButtonProps> = ({ label, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition ${className}`}
    >
      {label}
    </button>
  );
};

export default ZButton;
