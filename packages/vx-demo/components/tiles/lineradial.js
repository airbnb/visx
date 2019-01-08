import React from 'react';
import { Group } from '@vx/group';
import { LineRadial } from '@vx/shape';
import { scaleTime, scaleLog } from '@vx/scale';
import { curveBasisOpen } from '@vx/curve';
import { appleStock } from '@vx/mock-data';
import { LinearGradient } from '@vx/gradient';
import { AxisLeft } from '@vx/axis';
import { GridRadial, GridPolar } from '@vx/grid';

const green = '#e5fd3d';
const blue = '#aeeef8';
const darkgreen = '#dff84d';
const bg = '#744cca';

// utils
const extent = (data, value = d => d) => [
  Math.min(...data.map(value)),
  Math.max(...data.map(value))
];

// accessors
const date = d => new Date(d.date);
const close = d => d.close;

// scales
const xScale = scaleTime({
  range: [0, Math.PI * 2],
  domain: extent(appleStock, date)
});
const yScale = scaleLog({
  domain: extent(appleStock, close)
});

const angle = d => xScale(date(d));
const radius = d => yScale(close(d));

const padding = 20;
const firstPoint = appleStock[0];
const lastPoint = appleStock[appleStock.length - 1];

export default ({ width, height }) => {
  if (width < 10) return null;

  yScale.range([0, height / 2 - padding]);
  const reverseYScale = yScale.copy().range(yScale.range().reverse());

  return (
    <svg width={width} height={height}>
      <LinearGradient from={green} to={blue} id="line-gradient" />
      <rect width={width} height={height} fill={bg} rx={14} />
      <Group top={height / 2} left={width / 2}>
        <GridRadial
          scale={yScale}
          stroke={blue}
          strokeWidth={1}
          fill={blue}
          fillOpacity={0.1}
          strokeOpacity={0.2}
        />
        <GridPolar
          scale={xScale}
          outerRadius={height / 2 - padding}
          stroke={blue}
          strokeWidth={1}
          strokeOpacity={0.1}
          strokeDasharray="5,2"
          numTicks={20}
        />
        <AxisLeft
          top={-height / 2 + padding}
          scale={reverseYScale}
          tickStroke="none"
          tickLabelProps={val => ({
            fontSize: 8,
            fill: blue,
            fillOpacity: 1,
            textAnchor: 'middle',
            dx: '1em',
            dy: '-0.5em',
            stroke: bg,
            strokeWidth: 0.5,
            paintOrder: 'stroke'
          })}
          tickFormat={val => Number(val)}
          hideAxisLine
        />
        <LineRadial
          data={appleStock}
          angle={angle}
          radius={radius}
          fill="none"
          stroke="url('#line-gradient')"
          strokeWidth={2}
          strokeOpacity={0.8}
          strokeLinecap="round"
          curve={curveBasisOpen}
        />
        {[firstPoint, lastPoint].map((d, i) => {
          const cx = (xScale(date(d)) * Math.PI) / 180;
          const cy = -yScale(close(d));
          return <circle key={`line-cap-${i}`} cx={cx} cy={cy} fill={darkgreen} r={3} />;
        })}
      </Group>
    </svg>
  );
};
