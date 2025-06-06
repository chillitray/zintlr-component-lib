import React from 'react';

export const ExampleCard = ({ title = 'Hello World', children }) => {
  return (
    <div>
      <h2>{title}</h2>
      <div>{children || <p>Default content</p>}</div>
    </div>
  );
};
