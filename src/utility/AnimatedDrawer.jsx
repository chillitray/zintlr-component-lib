import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import { IoClose } from 'react-icons/io5';

/**
 * This component represents a sidebar that can be conditionally shown or hidden.
 *
 * condition - A flag indicating whether the sidebar should be shown.
 * children - The content to be displayed within the sidebar.
 * onClose - A callback function to be executed when the sidebar is closed.
 * className - Additional CSS classes for styling the sidebar content.
 * parentClassName - Additional CSS classes for styling the parent container of the sidebar.
 */
function AnimatedDrawer({
  children,
  isDrawerOpen,
  onClose,
  ParentComponent,
  className = '',
  parentClassName = '',
  closeBtnNeeded = false,
}) {
  return (
    <AnimatePresence>
      <motion.div
        key="animated-drawer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className={`block fixed overflow-hidden z-[50] bg-gray-900 bg-opacity-75 inset-0 transform ease-in-out  ${parentClassName}
                ${
                  isDrawerOpen
                    ? ' transition-opacity opacity-100 duration-100 translate-x-0'
                    : ' delay-300 opacity-0 translate-x-full '
                } `}
      />

      {ParentComponent ? <ParentComponent /> : <></>}

      {/* Show content only when condition is true */}
      {isDrawerOpen && (
        <motion.div
          key="sidebar"
          initial={{ x: '50vw', opacity: 0 }}
          animate={{
            x: 0,
            opacity: 1,
            transition: {
              duration: 0.1,
              type: 'just',
            },
          }}
          exit={{ x: '50vw', opacity: 0 }}
          className={`sidebar-wrapper scrollbar-hide z-[60] bg-white ${className}`}
        >
          {/* Close icon for closing the sidebar */}
          {closeBtnNeeded && (
            <button
              type="button"
              className="absolute top-0 right-0 p-2 z-10 border-0 bg-transparent ml-auto"
              onClick={onClose}
            >
              <IoClose color="black" className=" text-3xl" />
            </button>
          )}
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AnimatedDrawer;
