import React from 'react';

import {
  help_support_data,
  zintlr_doc_data,
} from '../../../constants/Profile/HelpAndSupport/help-and-support';
import HelpSupportCard from './HelpSupportCard';
import ZintlrDocCard from './ZintlrDocCard';

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
