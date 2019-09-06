import React from 'react';
import { Group } from '@vx/group';
import { curveBasis } from '@vx/curve';
import { LinePath } from '@vx/shape';
import { Threshold } from '@vx/threshold';
import { scaleTime, scaleLinear } from '@vx/scale';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { GridRows, GridColumns } from '@vx/grid';
import { cityTemperature as data } from '@vx/mock-data';
import { timeParse } from 'd3-time-format';

const parseDate = timeParse('%Y%m%d');

// accessors
const date = d => parseDate(d.date);
const ny = d => d['New York'];
const sf = d => d['San Francisco'];

// scales
const xScale = scaleTime({
  domain: [Math.min(...data.map(date)), Math.max(...data.map(date))],
});
const yScale = scaleLinear({
  domain: [
    Math.min(...data.map(d => Math.min(ny(d), sf(d)))),
    Math.max(...data.map(d => Math.max(ny(d), sf(d)))),
  ],
  nice: true,
});

export default function Theshold({ width, height, margin /** events */ }) {
  if (width < 10) return null;

  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  xScale.range([0, xMax]);
  yScale.range([yMax, 0]);

  return (
    <div>
      <svg width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} fill="#f3f3f3" rx={14} />
        <Group left={margin.left} top={margin.top}>
          <GridRows scale={yScale} width={xMax} height={yMax} stroke="#e0e0e0" />
          <GridColumns scale={xScale} width={xMax} height={yMax} stroke="#e0e0e0" />
          <line x1={xMax} x2={xMax} y1={0} y2={yMax} stroke="#e0e0e0" />
          <AxisBottom top={yMax} scale={xScale} numTicks={width > 520 ? 10 : 5} />
          <AxisLeft scale={yScale} />
          <text x="-70" y="15" transform="rotate(-90)" fontSize={10}>
            Temperature (°F)
          </text>
          <Threshold
            id={`${Math.random()}`}
            data={data}
            x={d => xScale(date(d))}
            y0={d => yScale(ny(d))}
            y1={d => yScale(sf(d))}
            clipAboveTo={0}
            clipBelowTo={yMax}
            curve={curveBasis}
            belowAreaProps={{
              fill: 'red',
              fillOpacity: 0.4,
            }}
            aboveAreaProps={{
              fill: 'green',
              fillOpacity: 0.4,
            }}
          />
          <LinePath
            data={data}
            curve={curveBasis}
            x={d => xScale(date(d))}
            y={d => yScale(sf(d))}
            stroke="#000"
            strokeWidth={1.5}
            strokeOpacity={0.8}
            strokeDasharray="1,2"
          />
          <LinePath
            data={data}
            curve={curveBasis}
            x={d => xScale(date(d))}
            y={d => yScale(ny(d))}
            stroke="#000"
            strokeWidth={1.5}
          />
        </Group>
      </svg>
    </div>
  );
}
