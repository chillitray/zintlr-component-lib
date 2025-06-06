import React from 'react';

export const ExampleCard = ({ title = 'Hello World', children }) => {
  return (
    <div className="border rounded-lg p-4 bg-white">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <div className="content">{children || <p>Default content</p>}</div>
    </div>
  );
};
