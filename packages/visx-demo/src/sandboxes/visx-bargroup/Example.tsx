import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import { BarGroup as VisxBarGroup } from '@visx/shape';
import { AxisBottom } from '@visx/axis';
import cityTemperature, { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { timeParse, timeFormat } from 'd3-time-format';

const blue = '#aeeef8';
export const green = '#e5fd3d';
const purple = '#9caff6';
export const background = '#612efb';

const defaultMargin = { top: 40, right: 0, bottom: 40, left: 0 };

type GroupKey = string | number;

// scales
function createXScale<Datum>(
  data: Datum[],
  getXValue: BarGroupProps<Datum>['xAccessor'],
  xMax: number,
) {
  const xScale = scaleBand<string>({
    domain: data.map(getXValue),
    padding: 0.2,
  });
  xScale.rangeRound([0, xMax]);
  return xScale;
}

function createGroupScale<Key extends GroupKey = GroupKey>(
  groupKeys: Key[],
  groupBarWidth: number,
) {
  const groupBarScale = scaleBand<Key>({
    domain: groupKeys,
    padding: 0.1,
  });
  groupBarScale.rangeRound([0, groupBarWidth]);
  return groupBarScale;
}

function createYScale<Datum, Key extends GroupKey = GroupKey>(
  data: Datum[],
  getMaxGroupValue: (d: Datum, groupKeys: Key[]) => number,
  yMax: number,
  groupKeys: Key[],
) {
  const yScale = scaleLinear<number>({
    domain: [0, Math.max(...data.map(datum => getMaxGroupValue(datum, groupKeys)))],
  });
  yScale.range([yMax, 0]);
  return yScale;
}

function createColorScale<Key extends GroupKey = GroupKey>(groupKeys: Key[]) {
  const colorScale = scaleOrdinal<Key, string>({
    domain: groupKeys,
    range: [blue, green, purple],
  });
  return colorScale;
}

export type BarGroupProps<Datum, Key extends GroupKey = GroupKey> = {
  data: Datum[];
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  events?: boolean;
  yAccessor: (d: Datum, groupKeys: Key[]) => number;
  xAccessor: (d: Datum) => string;
  getGroupKeys: (d: Datum) => Key[];
  formatXValue: (value: string) => string;
};

function BarGroup<Datum, Key extends GroupKey = GroupKey>({
  width,
  height,
  events = false,
  margin = defaultMargin,
  xAccessor,
  yAccessor,
  getGroupKeys,
  formatXValue,
  data,
}: BarGroupProps<Datum, Key>) {
  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // names of items in each bar group
  const groupKeys = useMemo(() => getGroupKeys(data[0]), [data, getGroupKeys]);

  // scales
  const xScale = useMemo(() => createXScale(data, xAccessor, xMax), [data, xAccessor, xMax]);
  const barWidth = xScale.bandwidth();
  const x1Scale = useMemo(() => createGroupScale(groupKeys, barWidth), [groupKeys, barWidth]);
  const yScale = useMemo(() => createYScale(data, yAccessor, yMax, groupKeys), [
    data,
    yAccessor,
    yMax,
    groupKeys,
  ]);
  const colorScale = useMemo(() => createColorScale(groupKeys), [groupKeys]);

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} fill={background} rx={14} />
      <Group top={margin.top} left={margin.left}>
        <VisxBarGroup
          data={data}
          keys={groupKeys}
          height={yMax}
          x0={xAccessor}
          x0Scale={xScale}
          x1Scale={x1Scale}
          yScale={yScale}
          color={colorScale}
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
        </VisxBarGroup>
      </Group>
      <AxisBottom
        top={yMax + margin.top}
        tickFormat={formatXValue}
        scale={xScale}
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
}

type CityName = 'New York' | 'San Francisco' | 'Austin';

// accessors
const getDate = (datum: CityTemperature) => datum.date;

const getGroupMaxCityTemperature = (data: CityTemperature, cities: CityName[]): number =>
  Math.max(...cities.map(city => Number(data[city])));

const getCityNames = (datum: CityTemperature) =>
  Object.keys(datum).filter(d => d !== 'date') as CityName[];

const data = cityTemperature.slice(0, 8);

// formatters
const parseDate = timeParse('%Y-%m-%d');
const format = timeFormat('%b %d');
const formatDate = (date: string) => format(parseDate(date) as Date);

export type BarGroupExampleProps = Pick<
  BarGroupProps<CityTemperature, CityName>,
  'events' | 'height' | 'width' | 'margin'
>;

export default function BarGroupExample({ width, height, margin, events }: BarGroupExampleProps) {
  return (
    <BarGroup
      events={events}
      width={width}
      height={height}
      margin={margin}
      data={data}
      xAccessor={getDate}
      yAccessor={getGroupMaxCityTemperature}
      formatXValue={formatDate}
      getGroupKeys={getCityNames}
    />
  );
}
