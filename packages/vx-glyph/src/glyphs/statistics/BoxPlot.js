import React from 'react';
import classnames from 'classnames';
import Glyph from '../Glyph';

export default function GlyphBoxPlot({
  left = 0,
  className,
  max,
  min,
  firstQuartile,
  thirdQuartile,
  median,
  boxWidth,
  fill,
  stroke,
  strokeWidth,
}) {
  const centerX = left + boxWidth/2;
  return (
    <Glyph
      className={classnames('vx-glyph-boxplot', className)}
    >
      <line
        x1={centerX - boxWidth/4}
        y1={max}
        x2={centerX + boxWidth/4}
        y2={max}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <line
        x1={centerX}
        y1={max}
        x2={centerX}
        y2={thirdQuartile}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <rect
        x={left}
        y={thirdQuartile}
        width={boxWidth}
        height={firstQuartile - thirdQuartile}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill={fill}
        rx={2}
        ry={2}
      />
      <line
        x1={left}
        y1={median}
        x2={left + boxWidth}
        y2={median}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <line
        x1={centerX}
        y1={firstQuartile}
        x2={centerX}
        y2={min}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <line
        x1={centerX - boxWidth/4}
        y1={min}
        x2={centerX + boxWidth/4}
        y2={min}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    </Glyph>
  );
}
