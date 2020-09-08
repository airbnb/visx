import React from 'react';
import { Group } from '@vx/group';
import { curveBasis } from '@vx/curve';
import { LinePath } from '@vx/shape';
import { Threshold } from '@vx/threshold';
import { scaleTime, scaleLinear } from '@vx/scale';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { GridRows, GridColumns } from '@vx/grid';
import cityTemperature, { CityTemperature } from '@vx/mock-data/lib/mocks/cityTemperature';

export const background = '#f3f3f3';

// accessors
const date = (d: CityTemperature) => new Date(d.date).valueOf();
const ny = (d: CityTemperature) => Number(d['New York']);
const sf = (d: CityTemperature) => Number(d['San Francisco']);

// scales
const timeScale = scaleTime<number>({
  domain: [Math.min(...cityTemperature.map(date)), Math.max(...cityTemperature.map(date))],
});
const temperatureScale = scaleLinear<number>({
  domain: [
    Math.min(...cityTemperature.map(d => Math.min(ny(d), sf(d)))),
    Math.max(...cityTemperature.map(d => Math.max(ny(d), sf(d)))),
  ],
  nice: true,
});

const defaultMargin = { top: 40, right: 30, bottom: 50, left: 40 };

export type ThresholdProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

export default function Theshold({ width, height, margin = defaultMargin }: ThresholdProps) {
  if (width < 10) return null;

  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  timeScale.range([0, xMax]);
  temperatureScale.range([yMax, 0]);

  return (
    <div>
      <svg width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} fill={background} rx={14} />
        <Group left={margin.left} top={margin.top}>
          <GridRows scale={temperatureScale} width={xMax} height={yMax} stroke="#e0e0e0" />
          <GridColumns scale={timeScale} width={xMax} height={yMax} stroke="#e0e0e0" />
          <line x1={xMax} x2={xMax} y1={0} y2={yMax} stroke="#e0e0e0" />
          <AxisBottom top={yMax} scale={timeScale} numTicks={width > 520 ? 10 : 5} />
          <AxisLeft scale={temperatureScale} />
          <text x="-70" y="15" transform="rotate(-90)" fontSize={10}>
            Temperature (°F)
          </text>
          <Threshold<CityTemperature>
            id={`${Math.random()}`}
            data={cityTemperature}
            x={d => timeScale(date(d))}
            y0={d => temperatureScale(ny(d))}
            y1={d => temperatureScale(sf(d))}
            clipAboveTo={0}
            clipBelowTo={yMax}
            curve={curveBasis}
            belowAreaProps={{
              fill: 'violet',
              fillOpacity: 0.4,
            }}
            aboveAreaProps={{
              fill: 'green',
              fillOpacity: 0.4,
            }}
          />
          <LinePath
            data={cityTemperature}
            curve={curveBasis}
            x={d => timeScale(date(d))}
            y={d => temperatureScale(sf(d))}
            stroke="#222"
            strokeWidth={1.5}
            strokeOpacity={0.8}
            strokeDasharray="1,2"
          />
          <LinePath
            data={cityTemperature}
            curve={curveBasis}
            x={d => timeScale(date(d))}
            y={d => temperatureScale(ny(d))}
            stroke="#222"
            strokeWidth={1.5}
          />
        </Group>
      </svg>
    </div>
  );
}
