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
  background,
  complement = false,
  className,
}) {
  let corners;
  if (complement) {
    corners = [
      [0,0],
      [0, height],
      [width, 0],
      [width, height]
    ];
  }
  return (
    <Pattern
      id={id}
      width={width}
      height={height}
    >
      {!!background &&
        <rect
          width={width}
          height={height}
          fill={background}
        />
      }
      <circle
        className={cxx('vx-pattern-circle', className)}
        cx={width / 2}
        cy={height / 2}
        r={radius}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
      />
      {complement && corners.map(([cornerX, cornerY]) => {
        return (
          <circle
            key={`${id}-complement-${cornerX}-${cornerY}`}
            className={cxx('vx-pattern-circle vx-pattern-circle-complement', className)}
            cx={cornerX}
            cy={cornerY}
            r={radius}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
          />
        );
      })}
    </Pattern>
  );
}
