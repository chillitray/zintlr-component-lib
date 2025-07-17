import { useState } from 'react';

interface ZButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
}
const ZButton = ({ label, className = '' }: ZButtonProps): JSX.Element => {

  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition ${className}`}
    >
      {label}
      <span>{count}</span>
    </button>
  );
};

export { ZButton };
