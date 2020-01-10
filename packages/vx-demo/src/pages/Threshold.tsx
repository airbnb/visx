import React from 'react';
import Show from '../components/Show';
import Threshold from '../components/tiles/Threshold';

function Description({ width }) {
  return (
    <div style={{ width, fontSize: 14, lineHeight: '1.5em' }}>
      The temperature in New York compared to San Francisco; days when New York was warmer are
      green, and colder days are violet. Based on Mike Bostock's{' '}
      <a href="https://bl.ocks.org/mbostock/3894205" target="_blank" rel="noopener noreferrer">
        Difference Chart
      </a>
      .
    </div>
  );
}

export default () => {
  return (
    <Show
      component={Threshold}
      title="Threshold"
      description={Description}
      margin={{
        top: 40,
        left: 40,
        right: 20,
        bottom: 50,
      }}
    >
      {`import React from 'react';
import { Group } from '@vx/group';
import { curveBasis } from '@vx/curve';
import { LinePath } from '@vx/shape';
import { Threshold } from '@vx/threshold';
import { scaleTime, scaleLinear } from '@vx/scale';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { GridRows, GridColumns } from '@vx/grid';
import cityTemperature, { CityTemperature } from '@vx/mock-data/lib/mocks/cityTemperature';
import { timeParse } from 'd3-time-format';
import { ShowProvidedProps } from '../../types';

const parseDate = timeParse('%Y%m%d');

// accessors
const date = (d: CityTemperature) => (parseDate(d.date) as Date).valueOf();
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

export default function Theshold({
  width,
  height,
  margin = { top: 0, right: 0, bottom: 0, left: 0 },
}: ShowProvidedProps) {
  if (width < 10) return null;

  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  timeScale.range([0, xMax]);
  temperatureScale.range([yMax, 0]);

  return (
    <div>
      <svg width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} fill="#f3f3f3" rx={14} />
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
            id={\`\${Math.random()}\`}
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
`}
    </Show>
  );
};
