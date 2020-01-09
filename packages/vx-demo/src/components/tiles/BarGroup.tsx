import React from 'react';
import { Group } from '@vx/group';
import { BarGroup } from '@vx/shape';
import { AxisBottom } from '@vx/axis';
import cityTemperature, { CityTemperature } from '@vx/mock-data/lib/mocks/cityTemperature';
import { scaleBand, scaleLinear, scaleOrdinal } from '@vx/scale';
import { timeParse, timeFormat } from 'd3-time-format';
import { ShowProvidedProps } from '../../types';

type CityName = 'New York' | 'San Francisco' | 'Austin';

const blue = '#aeeef8';
const green = '#e5fd3d';
const purple = '#9caff6';
const bg = '#612efb';

const data = cityTemperature.slice(0, 8);
const keys = Object.keys(data[0]).filter(d => d !== 'date') as CityName[];

const parseDate = timeParse('%Y%m%d');
const format = timeFormat('%b %d');
const formatDate = (date: string) => format(parseDate(date));

// accessors
const getDate = (d: CityTemperature) => d.date;

// scales
const dateScale = scaleBand<string>({
  domain: data.map(getDate),
  padding: 0.2,
});
const x1Scale = scaleBand<string>({
  domain: keys,
  padding: 0.1,
});
const yScale = scaleLinear<number>({
  domain: [0, Math.max(...data.map(d => Math.max(...keys.map(key => Number(d[key])))))],
});
const color = scaleOrdinal<string, string>({
  domain: keys,
  range: [blue, green, purple],
});

export default ({
  width,
  height,
  events = false,
  margin = {
    top: 40,
    right: 0,
    bottom: 0,
    left: 0,
  },
}: ShowProvidedProps) => {
  if (width < 10) return null;

  // bounds
  const xMax = width;
  const yMax = height - margin.top - 100;

  dateScale.rangeRound([0, xMax]);
  x1Scale.rangeRound([0, dateScale.bandwidth()]);
  yScale.range([yMax, 0]);

  return (
    <svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} fill={bg} rx={14} />
      <Group top={margin.top}>
        <BarGroup<CityTemperature>
          data={data}
          keys={keys}
          height={yMax}
          x0={getDate}
          x0Scale={dateScale}
          x1Scale={x1Scale}
          yScale={yScale}
          color={color}
        >
          {barGroups =>
            barGroups.map(barGroup => (
              <Group key={`bar-group-${barGroup.index}-${barGroup.x0}`} left={barGroup.x0}>
                {barGroup.bars.map(bar => (
                  <rect
                    key={`bar-group-bar-${barGroup.index}-${bar.index}-${bar.value}-${bar.key}`}
                    x={bar.x}
                    y={bar.y}
                    width={bar.width}
                    height={bar.height}
                    fill={bar.color}
                    rx={4}
                    onClick={() => {
                      if (!events) return;
                      const { key, value } = bar;
                      alert(JSON.stringify({ key, value }));
                    }}
                  />
                ))}
              </Group>
            ))
          }
        </BarGroup>
      </Group>
      <AxisBottom
        top={yMax + margin.top}
        tickFormat={formatDate}
        scale={dateScale}
        stroke={green}
        tickStroke={green}
        hideAxisLine
        tickLabelProps={() => ({
          fill: green,
          fontSize: 11,
          textAnchor: 'middle',
        })}
      />
    </svg>
  );
};
