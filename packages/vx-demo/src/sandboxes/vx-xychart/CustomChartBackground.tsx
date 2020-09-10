import React, { useContext } from 'react';
import { PatternLines } from '@vx/pattern';
import { DataContext } from '@vx/xychart';

const patternId = 'xy-chart-pattern';

export default function CustomChartBackground() {
  const { theme, margin, width, height } = useContext(DataContext);
  const textStyles = { ...theme?.axisStyles.x.bottom.axisLabel, textAnchor: 'start' };

  // early return values not available in context
  if (width == null || height == null || margin == null || theme == null) return null;

  return (
    <>
      <PatternLines
        id={patternId}
        width={10}
        height={10}
        orientation={['diagonal']}
        stroke={theme?.gridStyles?.stroke}
        strokeWidth={1}
      />
      <rect x={0} y={0} width={width} height={height} fill={theme?.backgroundColor ?? '#fff'} />
      <rect
        x={margin.left}
        y={margin.top}
        width={width - margin.left - margin.right}
        height={height - margin.top - margin.bottom}
        fill={`url(#${patternId})`}
      />
      <text x={margin.left} y={height - margin.top + margin.bottom / 2} {...textStyles}>
        width {width}px
      </text>
      <g transform={`translate(${margin.left / 1.3}, ${height - margin.bottom})rotate(-90)`}>
        <text {...textStyles}>height {height}px</text>
      </g>
    </>
  );
}
