import React from 'react';

export const ExampleCard = ({ title, children }) => {
  return (
    <div className="border rounded-lg p-4 bg-white">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <div className="content">{children}</div>
    </div>
  );
};

