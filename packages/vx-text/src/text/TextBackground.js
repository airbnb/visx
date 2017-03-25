import React from 'react';
import cx from 'classnames';

export default function TextBackground({
  x = 0,
  y = 0,
  dx = 0,
  dy = 0,
  children,
  fontSize = 12,
  fontFamily = 'Arial',
  textAnchor = 'start',
  fill = 'white',
  stroke = 'none',
  strokeWidth = 0,
  strokeDasharray,
  backgroundFill = 'white',
  backgroundStroke = 'magenta',
  backgroundStrokeWidth = 3,
  backgroundStrokeDasharray,
  className,
}) {
  return (
    <g>
      <rect
        className={cx('vx-text-background__background', className)}
        width="100%"
        height="100%"
        fill={backgroundFill}
        stroke={backgroundStroke}
        strokeWidth={backgroundStrokeWidth}
        strokeDasharray={backgroundStrokeDasharray}
      />
      <text
        className={cx('vx-text-background__text', className)}
        x={x}
        y={y}
        dx={dx}
        dy={dy}
        fontSize={fontSize}
        fontFamily={fontFamily}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        textAnchor={textAnchor}
      >
        {children}
      </text>
    </g>
  );
}
