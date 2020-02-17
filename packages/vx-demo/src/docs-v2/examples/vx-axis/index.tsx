import React from 'react';
import { render } from 'react-dom';
// import { AreaPath } from "@vx/shape";
import { Grid } from '@vx/grid';
// import { curveMonotoneX } from "@vx/curve";
// import { genDateValue } from "@vx/mock-data";
import { scaleTime, scaleLinear, scaleLog, scaleBand } from '@vx/scale';
import { AxisBottom } from '@vx/axis';
// import { LinearGradient } from "@vx/gradient";
import ParentSize from '@vx/responsive/lib/components/ParentSize';
import { timeFormat } from 'd3-time-format';

import './styles.css';

const backgroundColor = '#da7cff';
const axisColor = '#fff';
const tickLabelColor = '#fff';
const labelColor = '#340098';
const gridColor = '#6e0fca';

function Example({
  width: outerWidth = 800,
  height: outerHeight = 800,
  margin = {
    top: 100,
    right: 150,
    bottom: 50,
    left: 50,
  },
}) {
  // in svg, margin is subtracted from total width/height
  const width = outerWidth - margin.left - margin.right;
  const height = outerHeight - margin.top - margin.bottom;
  const scales = [
    {
      scale: scaleLinear({
        domain: [0, 10],
        range: [0, width],
      }),
      tickFormat: v => (v === 10 ? 'last' : (v === 0 && 'first') || v),
      tickLabelProps: p => p,
      label: 'linear',
    },
    {
      scale: scaleBand({
        domain: ['a', 'b', 'c', 'd'],
        range: [0, width],
      }),
      tickFormat: v => v,
      label: 'categories',
    },
    {
      scale: scaleTime({
        domain: [new Date('2018-01-05 2:00'), new Date('2018-02-20 2:00')],
        range: [0, width],
      }),
      tickFormat: (v, i) => (i > 1 && i < 6 ? '🎉' : timeFormat('%b %d')(v)),
      label: 'time',
    },
    {
      scale: scaleLog({
        domain: [1, 10000],
        range: [0, width],
      }),
      tickFormat: v => (String(v)[0] === '1' ? v : ''),
      label: 'log',
      numTickRows: 1,
    },
  ];

  const scalePadding = 50;
  const scaleHeight = (0.3 * height) / scales.length;

  const yScale = scaleLinear({
    domain: [0, 100],
    range: [-scaleHeight, 0],
  });

  return (
    <svg width={outerWidth} height={outerHeight}>
      <rect x={0} y={0} width={outerWidth} height={outerHeight} fill={backgroundColor} rx={14} />
      <g transform={`translate(${margin.left},${margin.top})`}>
        {scales.map(({ scale, label, tickFormat, numTickRows = 2, numTickColumns = 5 }, i) => (
          <g key={`scale-${i}`} transform={`translate(0, ${i * (scaleHeight + scalePadding)})`}>
            <Grid
              xScale={scale}
              yScale={yScale}
              stroke={gridColor}
              width={width}
              height={-scaleHeight}
              numTicksRows={numTickRows}
              numTicksColumns={numTickColumns}
            />
            <AxisBottom
              scale={scale}
              tickFormat={tickFormat}
              stroke={axisColor}
              tickStroke={axisColor}
              tickLabelProps={(value, index) => ({
                fill: tickLabelColor,
                fontSize: 12,
                fontFamily: 'sans-serif',
                textAnchor: 'middle',
              })}
              label={label}
              labelProps={{
                x: width + 30,
                y: -10,
                fill: labelColor,
                fontSize: 18,
                strokeWidth: 0,
                stroke: '#fff',
                paintOrder: 'stroke',
                fontFamily: 'sans-serif',
                textAnchor: 'start',
              }}
            />
          </g>
        ))}
      </g>
    </svg>
  );
}

render(
  <ParentSize>{({ width, height }) => <Example width={width} height={height} />}</ParentSize>,
  document.getElementById('root'),
);
