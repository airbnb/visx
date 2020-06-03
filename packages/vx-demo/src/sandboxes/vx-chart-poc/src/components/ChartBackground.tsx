import React, { useContext } from 'react';
import { PatternLines } from '@vx/pattern';
import ChartContext from '../context/ChartContext';

const patternId = 'xy-chart-pattern';

export default function CustomChartBackground() {
  const { xScale, yScale } = useContext(ChartContext);

  // early return if scale is not available in context
  if (!xScale || !yScale) return null;

  const xRange = xScale.range();
  const yRange = yScale.range();

  const x = Math.min(...xRange);
  const y = Math.min(...yRange);
  const width = Math.abs(xRange[1] - xRange[0]);
  const height = Math.abs(yRange[1] - yRange[0]);

  return (
    <>
      <PatternLines
        id={patternId}
        width={10}
        height={10}
        orientation={['diagonal']}
        stroke="#ddd"
      />
      <rect x={x} y={y} width={width} height={height} fill={`url(#${patternId})`} />
    </>
  );
}
