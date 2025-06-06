import React from 'react';
import { Toaster, toast } from 'sonner';

// Toast component that provides the Toaster container
export const ToastWrapper = ({ 
  position = 'bottom-right',
  expand = false,
  richColors = true,
  closeButton = true,
  ...props 
}) => {
  return (
    <Toaster
      position={position}
      expand={expand}
      richColors={richColors}
      closeButton={closeButton}
      {...props}
    />
  );
};

// Export toast functions for direct use
export { toast }; 