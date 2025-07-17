import React from 'react';
import cn from './cn';

const sizeClasses = {
  small: 'w-4 h-4 border-[2px]',
  medium: 'w-5 h-5 border-[3px]',
  large: 'w-8 h-8 border-[5px]',
};

const Loader = ({
  size = 'medium',
  className = '',
  containerClass,
  containerClassName = '',
  variant = 'white',
}) => {
  return (
    <div className={cn('flex items-center justify-center', containerClassName)}>
      <div className={cn('flex items-center  justify-center', containerClass)}>
        <div className="flex flex-col items-center">
          <div
            className={cn(
              `${sizeClasses[size]} ${
                variant === 'white' ? 'border-black border-t-white' : 'border-white border-t-black'
              }   rounded-full animate-spin`,
              className
            )}
          ></div>
        </div>
      </div>
    </div>
  );
};
export default Loader;
