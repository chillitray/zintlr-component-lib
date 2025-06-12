import React from 'react';
import style from './styles/skeleton_style.module.css';

/**
 * A Skeleton component to represent a loading placeholder
 * with customizable height and width.
 *
 * className - string - Additional classes to be applied to the skeleton container.
 * h - string - Height of the skeleton. Default value is "3".
 * w - string - Width of the skeleton. Default value is "100%".
 */
function Skeleton({ className, h = '2', w = '3/4' }) {
  return (
    <div
      className={`${className || ''} h-${h} w-${w} bg-slate-400 rounded ${style.skeleton}`}
    ></div>
  );
}

export default Skeleton;
