import React, { useContext } from 'react';
import { PatternLines } from '@vx/pattern';
import ChartContext from '../context/ChartContext';

const patternId = 'xy-chart-pattern';

export default function CustomChartBackground() {
  const { margin, width, height } = useContext(ChartContext);

  // early return if scale is not available in context
  if (width == null || height == null || margin == null) return null;

  return (
    <>
      <PatternLines
        id={patternId}
        width={10}
        height={10}
        orientation={['diagonal']}
        stroke="#dedede"
      />
      <rect
        x={margin.left}
        y={margin.top}
        width={width - margin.left - margin.right}
        height={height - margin.top - margin.bottom}
        fill={`url(#${patternId})`}
      />
    </>
  );
}
