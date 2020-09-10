import React, { useContext } from 'react';
import { PatternLines } from '@vx/pattern';
import { DataContext } from '@vx/xychart';

const patternId = 'xy-chart-pattern';

export default function CustomChartBackground() {
  const { theme, margin, width, height } = useContext(DataContext);

  // early return values not available in context
  if (width == null || height == null || margin == null || theme == null) return null;

  return (
    <>
      <PatternLines
        id={patternId}
        width={16}
        height={16}
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
        fillOpacity={0.3}
      />
    </>
  );
}
