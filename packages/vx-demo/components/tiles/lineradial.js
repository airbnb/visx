import React from 'react';
import { Group } from '@vx/group';
import { LineRadial } from '@vx/shape';
import { scaleTime, scaleLog } from '@vx/scale';
import { curveBasisOpen } from '@vx/curve';
import { appleStock } from '@vx/mock-data';
import { extent } from 'd3-array';
import { LinearGradient } from '@vx/gradient';

const x = d => new Date(d.date);
const y = d => d.close;

const capPoints = [appleStock[0]].concat([
  appleStock[appleStock.length - 1],
]);

export default function LineRadialTile({
  width,
  height,
  margin = {
    top: 10,
    left: 10,
    right: 10,
    bottom: 120,
  },
}) {
  if (width < 10) return null;

  const radius = Math.min(width, height) / 2;

  const xScale = scaleTime({
    range: [0, Math.PI * 2],
    domain: extent(appleStock, x),
  });
  const yScale = scaleLog({
    range: [0, height / 2 - 20],
    domain: extent(appleStock, y),
  });
  return (
    <svg width={width} height={height}>
      <LinearGradient
        from="#e5fd3d"
        to="#aeeef8"
        id="line-gradient"
      />
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill="#744cca"
        rx={14}
      />
      <Group top={height / 2} left={width / 2}>
        {yScale.ticks().map((tick, i) => {
          return (
            <g key={`radial-grid-${i}`}>
              <circle
                r={yScale(tick)}
                stroke="#aeeef8"
                strokeWidth={1}
                fill="#aeeef8"
                fillOpacity={1 / (i + 1) - 1 / i * 0.2}
                strokeOpacity={0.2}
              />
              <text
                y={-yScale(tick)}
                textAnchor="middle"
                dy={'-.33em'}
                fontSize={8}
                fill="#aeeef8"
                fillOpacity={0.6}
              >
                {tick}
              </text>
            </g>
          );
        })}
        <LineRadial
          data={appleStock}
          angle={d => xScale(x(d))}
          radius={d => yScale(y(d))}
          fill="none"
          stroke={"url('#line-gradient')"}
          strokeWidth={2}
          strokeOpacity={0.8}
          curve={curveBasisOpen}
          strokeLinecap="round"
        />
        {capPoints.map((d, i) => {
          return (
            <circle
              key={`line-cap-${i}`}
              cy={-yScale(y(d))}
              cx={xScale(x(d)) * Math.PI / 180}
              r={3}
              fill="#dff84d"
            />
          );
        })}
      </Group>
    </svg>
  );
}
