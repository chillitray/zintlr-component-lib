import React from 'react';

import {
  help_support_data,
  zintlr_doc_data,
} from '../../../constants/Profile/HelpAndSupport/help-and-support';
import HelpSupportCard from './HelpSupportCard';
import ZintlrDocCard from './ZintlrDocCard';

/**
 * Help and Support Section Component
 * Displays Zintlr documentation and help support cards
 * 
 * @component
 * @example
 * ```jsx
 * <HelpSupport />
 * ```
 * 
 * @returns {JSX.Element} Help and Support section with documentation and support cards
 */
const HelpSupport = () => {
  return (
    <>
      <ZintlrDocCard data={zintlr_doc_data} />
      {help_support_data.map((item, index) => (
        <HelpSupportCard key={index} item={item} colorId={index} />
      ))}
    </>
  );
};

export default HelpSupport;
