import React from 'react';
import classnames from 'classnames';
import Glyph from './Glyph';

export default function GlyphDot({
  top = 0,
  left = 0,
  className,
  children,
  cx,
  cy,
  r,
  fill,
  stroke,
  strokeWidth,
  strokeDasharray,
}) {
  return (
    <Glyph
      className={classnames('vx-glyph-dot', className)}
      top={top}
      left={left}
    >
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
      />
      {children}
    </Glyph>
  );
}
