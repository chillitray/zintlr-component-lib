import React from 'react';
import copy_to_clipboard from '../../../helpers/Items/copy_to_clipboard';
import { ZintlrDocCard } from './ZintlrDocCard';
import { HelpSupportCard } from './HelpSupportCard';

const zintlr_doc_data = {
  title: 'Documentation',
  description: 'Access comprehensive guides and documentation',
  onClick: () => window.open('https://docs.example.com', '_blank'),
};

const help_support_data = [
  {
    title: 'Contact Support',
    description: 'Get help from our support team',
    email: 'support@example.com',
    onClick: () => copy_to_clipboard('support@example.com', 'Support Email'),
  },
];

export const HelpSupport = () => {
  return (
    <>
      <ZintlrDocCard {...zintlr_doc_data} />
      {help_support_data.map((item, index) => (
        <HelpSupportCard key={index} item={item} colorId={index} />
      ))}
    </>
  );
};

export default HelpSupport;
