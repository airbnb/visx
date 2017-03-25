import React from 'react';
import cx from 'classnames';

export default function TextOutline({
  x = 0,
  y = 0,
  dx = 0,
  dy = 0,
  children,
  fontSize = 12,
  fontFamily = 'Arial',
  fill = 'white',
  stroke = 'none',
  strokeWidth = 0,
  outlineFill = 'white',
  outlineStroke = 'magenta',
  outlineStrokeWidth = 3,
  textAnchor = 'start',
  className,
}) {
  return (
    <g>
      <text
        className={cx('vx-text-outline__outline', className)}
        x={x}
        y={y}
        dx={dx}
        dy={dy}
        fill={outlineFill}
        fontSize={fontSize}
        fontFamily={fontFamily}
        stroke={outlineStroke}
        strokeWidth={outlineStrokeWidth}
        textAnchor={textAnchor}
      >
        {children}
      </text>
      <text
        className={cx('vx-text-outline__text', className)}
        x={x}
        y={y}
        dx={dx}
        dy={dy}
        fontSize={fontSize}
        fontFamily={fontFamily}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        textAnchor={textAnchor}
      >
        {children}
      </text>
    </g>
  );
}
