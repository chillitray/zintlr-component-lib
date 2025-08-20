/**
 * A Skeleton component to represent a loading placeholder with customizable height and width.
 * @param {string} className Additional classes to be applied to the skeleton container.
 * @param {string} h Height of the skeleton. Default value is "2".
 * @param {string} w Width of the skeleton. Default value is "3/4".
 * @returns {React.ReactNode} A React node representing the skeleton placeholder.
 */
import React from 'react';
const Skeleton = ({ className, h = '2', w = '3/4' }) => (
  <div
    className={` ${className || ''} h-${h} w-${w} rounded bg-slate-400 `}
  ></div>
);

export { Skeleton };
