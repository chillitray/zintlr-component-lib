import React from 'react';

/**
 * This component creates a backdrop with a blurred
 * effect and centers its children within it.
 * props - The properties of the BlurComponent.
 * props.children - The content to be rendered inside the component.
 * props.className - Additional CSS classes to be applied to the outer span element.
 * props.childClass - Additional CSS classes to be applied to the inner span element.
 * @returns {React.ReactNode}
 */
function BlurComponent({ children, className = '', childClass = '' }) {
  return (
    <span
      className={`backdrop-blur-sm bg-white/30  text-text-black text-xl absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center ${className}`}
    >
      <span className={`text-center ${childClass}`}>{children}</span>
    </span>
  );
}

export default BlurComponent;
