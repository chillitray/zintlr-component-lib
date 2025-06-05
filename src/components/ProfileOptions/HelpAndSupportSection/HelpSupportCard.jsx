import React from 'react';
import PropTypes from 'prop-types';

export const HelpSupportCard = ({ item, colorId }) => {
  const colors = ['bg-blue-100', 'bg-green-100', 'bg-yellow-100', 'bg-red-100'];

  return (
    <div
      className={`flex items-center p-4 rounded-lg cursor-pointer ${
        colors[colorId % colors.length]
      } hover:opacity-80`}
      onClick={item.onClick}
    >
      {item.icon && <div className="text-2xl mr-4">{item.icon}</div>}
      <div>
        <h3 className="text-lg font-medium">{item.title}</h3>
        {item.description && <p className="text-sm text-gray-600">{item.description}</p>}
        {item.email && <p className="text-sm text-blue-600">{item.email}</p>}
      </div>
    </div>
  );
};

HelpSupportCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    email: PropTypes.string,
    icon: PropTypes.node,
    onClick: PropTypes.func,
  }).isRequired,
  colorId: PropTypes.number,
};

export default HelpSupportCard;
