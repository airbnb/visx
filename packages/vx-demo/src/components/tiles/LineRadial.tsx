import React from 'react';
import { Group } from '@vx/group';
import { LineRadial } from '@vx/shape';
import { scaleTime, scaleLog } from '@vx/scale';
import { curveBasisOpen } from '@vx/curve';
import appleStock, { AppleStock } from '@vx/mock-data/lib/mocks/appleStock';
import { LinearGradient } from '@vx/gradient';
import { ShowProvidedProps } from '../../types';

const green = '#e5fd3d';
const blue = '#aeeef8';
const darkgreen = '#dff84d';
const bg = '#744cca';

// utils
function extent<Datum>(data: Datum[], value: (d: Datum) => number) {
  return [Math.min(...data.map(value)), Math.max(...data.map(value))];
}

// accessors
const date = (d: AppleStock) => new Date(d.date).valueOf();
const close = (d: AppleStock) => d.close;

// scales
const xScale = scaleTime<number>({
  range: [0, Math.PI * 2],
  domain: extent(appleStock, date),
});
const yScale = scaleLog<number>({
  domain: extent(appleStock, close),
});

const angle = (d: AppleStock) => xScale(date(d));
const radius = (d: AppleStock) => yScale(close(d));

const firstPoint = appleStock[0];
const lastPoint = appleStock[appleStock.length - 1];

export default ({ width, height }: ShowProvidedProps) => {
  if (width < 10) return null;

  yScale.range([0, height / 2 - 20]);

  return (
    <svg width={width} height={height}>
      <LinearGradient from={green} to={blue} id="line-gradient" />
      <rect width={width} height={height} fill={bg} rx={14} />
      <Group top={height / 2} left={width / 2}>
        {yScale.ticks().map((tick, i) => {
          const y = yScale(tick);
          const opacity = 1 / (i + 1) - (1 / i) * 0.2;
          return (
            <g key={`radial-grid-${i}`}>
              <circle
                r={y}
                stroke={blue}
                strokeWidth={1}
                fill={blue}
                fillOpacity={opacity}
                strokeOpacity={0.2}
              />
              <text
                y={-y}
                dy="-.33em"
                fontSize={8}
                fill={blue}
                fillOpacity={0.6}
                textAnchor="middle"
              >
                {tick}
              </text>
            </g>
          );
        })}
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
