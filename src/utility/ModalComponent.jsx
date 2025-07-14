import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { isBrowser } from '../helpers/isBrowser';
import { cn } from '../utility/cn';

/**
 * ModalComponent is a reusable modal component that can be used to display content in a modal dialog.
 * children - The content to be displayed inside the modal.
 * [title] - The title of the modal.
 * setShowModal - A function to control the visibility of the modal.
 * [className=""] - Additional classes to be applied to the modal container.
 * [contentClassName=""] - Additional classes to be applied to the content container (parent of header and body).
 * [ClosingComponent=null] - An optional custom component to be used as the closing button.
 * [isOutSideClickAllowed=true] - If true, the modal will close on clicking outside of the pop up (default is true).
 * [showHeader=true] - If true, show the header; else hide it.
 * It returns- The modal component JSX.
 */
const ModalComponent = ({
  children,
  title,
  setShowModal = () => {},
  className = 'sm:w-4/5 md:w-2/3 lg:w-1/3',
  contentClassName = '',
  ClosingComponent = null,
  isOutSideClickAllowed = true,
  showHeader = true,
  bodyClassName = 'relative px-4 pb-4 pt-2 flex-auto',
}) => {
  useEffect(() => {
    if (isBrowser()) {
      //Add overflow hidden to the body to avoid scrolling when the modal is visible
      document.querySelector('body').style.overflow = 'hidden';
      //Remove it before unmounting modal
      return () => {
        document.querySelector('body').style.overflow = 'unset';
      };
    }
    return () => {};
  }, []);

  //Close the modal
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <AnimatePresence>
      <motion.div
        key="modal"
        initial={{ y: '-50vh', opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: { duration: 0.1, type: 'spring', damping: 25, stiffness: 500 },
        }}
        exit={{ y: '50vh', opacity: 0 }}
        onClick={() => {
          if (isOutSideClickAllowed) {
            closeModal();
          }
        }}
        className="justify-center  text-text-black flex scrollable_div overflow-x-hidden overflow-y-auto fixed  inset-0  z-[9999999999999999999] outline-none focus:outline-none"
      >
        <div
          className={cn(
            'relative w-full my-6 sm:my-0 mt-auto mb-0 mx-auto sm:w-4/5 md:w-2/3 lg:w-1/3  flex items-center',
            className
          )}
        >
          {/*content*/}
          <div
            onClick={(event) => event.stopPropagation(closeModal)}
            className={cn(
              'border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none',
              contentClassName
            )}
          >
            {/*header*/}
            {showHeader && (
              <div className="flex items-start justify-between px-4 pt-4 pb-2 rounded-t">
                <h3 className="text-xl font-semibold ">{title}</h3>

                {ClosingComponent ? (
                  <ClosingComponent />
                ) : (
                  <button
                    className="p-1 ml-auto bg-transparent border-0 outline-none focus:outline-none"
                    onClick={closeModal}
                  >
                    <FaTimes className="w-4 h-4 text-gray-600" />
                  </button>
                )}
              </div>
            )}
            {/*body*/}
            <div className={`${bodyClassName}`}>{children}</div>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="opacity-50 fixed inset-0 z-[90] bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
      ></motion.div>
    </AnimatePresence>
  );
};

export default ModalComponent;
