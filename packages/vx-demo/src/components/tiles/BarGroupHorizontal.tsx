import React from 'react';
import { BarGroupHorizontal, Bar } from '@vx/shape';
import { Group } from '@vx/group';
import { AxisLeft } from '@vx/axis';
import cityTemperature, { CityTemperature } from '@vx/mock-data/lib/mocks/cityTemperature';
import { scaleBand, scaleLinear, scaleOrdinal } from '@vx/scale';
import { timeParse, timeFormat } from 'd3-time-format';
import { ShowProvidedProps } from '../../types';

type CityName = 'New York' | 'San Francisco' | 'Austin';

const parseDate = timeParse('%Y%m%d');
const format = timeFormat('%b %d');
const formatDate = (date: string) => format(parseDate(date) as Date);
function max<D>(arr: D[], fn: (d: D) => number) {
  return Math.max(...arr.map(fn));
}

const data = cityTemperature.slice(0, 4);
const keys = Object.keys(data[0]).filter(d => d !== 'date') as CityName[];

// accessors
const getDate = (d: CityTemperature) => d.date;

// scales
const dateScale = scaleBand<string>({
  domain: data.map(getDate),
  padding: 0.2,
});
const cityScale = scaleBand<string>({
  domain: keys,
  padding: 0.1,
});
const tempScale = scaleLinear<number>({
  domain: [0, max(data, d => max(keys, key => Number(d[key])))],
});
const colorScale = scaleOrdinal<string, string>({
  domain: keys,
  range: ['#aeeef8', '#e5fd3d', '#9caff6'],
});

export default ({
  width,
  height,
  margin = {
    top: 20,
    left: 50,
    right: 10,
    bottom: 0,
  },
  events = false,
}: ShowProvidedProps) => {
  if (width < 10) return null;

  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - 100;

  // scales
  dateScale.rangeRound([0, yMax]);
  cityScale.rangeRound([0, dateScale.bandwidth()]);
  tempScale.rangeRound([0, xMax]);

  return (
    <svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} fill="#612efb" rx={14} />
      <Group top={margin.top} left={margin.left}>
        <BarGroupHorizontal<CityTemperature>
          data={data}
          keys={keys}
          width={xMax}
          y0={getDate}
          y0Scale={dateScale}
          y1Scale={cityScale}
          xScale={tempScale}
          color={colorScale}
        >
          {barGroups =>
            barGroups.map(barGroup => (
              <Group
                key={`bar-group-horizontal-${barGroup.index}-${barGroup.y0}`}
                top={barGroup.y0}
              >
                {barGroup.bars.map(bar => (
                  <Bar
                    key={`${barGroup.index}-${bar.index}-${bar.key}`}
                    x={bar.x}
                    y={bar.y}
                    width={bar.width}
                    height={bar.height}
                    fill={bar.color}
                    rx={4}
                    onClick={() => {
                      if (events) alert(`${bar.key} (${bar.value}) - ${JSON.stringify(bar)}`);
                    }}
                  />
                ))}
              </Group>
            ))
          }
        </BarGroupHorizontal>
        <AxisLeft
          scale={dateScale}
          stroke="#e5fd3d"
          tickStroke="#e5fd3d"
          tickFormat={formatDate}
          hideAxisLine
          tickLabelProps={() => ({
            fill: '#e5fd3d',
            fontSize: 11,
            textAnchor: 'end',
            dy: '0.33em',
          })}
        />
      </Group>
    </svg>
  );
};
