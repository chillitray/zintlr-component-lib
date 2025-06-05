import React from 'react';
import PropTypes from 'prop-types';

const ZintlrDocCard = ({ title, description, icon, onClick }) => {
  return (
    <div
      className="flex items-center gap-4 p-4 rounded-lg cursor-pointer hover:bg-gray-50"
      onClick={onClick}
    >
      {icon && <div className="text-2xl text-gray-600">{icon}</div>}
      <div>
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
    </div>
  );
};

ZintlrDocCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  icon: PropTypes.node,
  onClick: PropTypes.func,
};

export default ZintlrDocCard;
