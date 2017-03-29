import React from 'react';
import cx from 'classnames';
import Pattern from './Pattern';

export default function Path({
  id,
  width,
  height,
  path,
  fill = 'transparent',
  stroke,
  strokeWidth,
  strokeDasharray,
  strokeLinecap = 'square',
  shapeRendering = 'auto',
  background,
  className,
}) {
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
      <path
        className={cx('vx-pattern-path', className)}
        d={path}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        strokeLinecap={strokeLinecap}
        shapeRendering={shapeRendering}
      />
    </Pattern>
  );
}
