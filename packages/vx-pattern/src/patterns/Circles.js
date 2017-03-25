import React from 'react';
import cxx from 'classnames';
import Pattern from './Pattern';

export default function Circles({
  id,
  width,
  height,
  radius = 2,
  fill,
  stroke,
  strokeWidth,
  strokeDasharray,
  className,
}) {
  return (
    <Pattern
      id={id}
      width={width}
      height={height}
    >
      <circle
        className={cxx('vx-pattern-circle', className)}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
      />
    </Pattern>
  );
}
