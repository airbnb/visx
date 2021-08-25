import React, { useMemo } from 'react';
import { BarStackHorizontal } from '@visx/shape';
import { SeriesPoint } from '@visx/shape/lib/types';
import { Group } from '@visx/group';
import { AxisBottom, AxisLeft } from '@visx/axis';
import cityTemperature from '@visx/mock-data/lib/mocks/cityTemperature';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { timeParse, timeFormat } from 'd3-time-format';
import { defaultStyles, useTooltip, useTooltipInPortal } from '@visx/tooltip';
import { LegendOrdinal } from '@visx/legend';

const purple1 = '#6c5efb';
const purple2 = '#c998ff';
export const purple3 = '#a44afe';
export const background = '#eaedff';
const defaultMargin = { top: 40, left: 50, right: 40, bottom: 100 };
const tooltipStyles = {
  ...defaultStyles,
  minWidth: 60,
  backgroundColor: 'rgba(0,0,0,0.9)',
  color: 'white',
};

let tooltipTimeout: number;

type Margin = { top: number; right: number; bottom: number; left: number };

type StackCategory = {
  name: string;
  value: number;
};

type BarData = {
  name: string; // maybe change this to label
  categories: StackCategory[];
};

const getXTotalValues = (data: BarData[]): number[] =>
  data.map(datum =>
    datum.categories.reduce((total, category) => total + Number(category.value), 0),
  );

const getYValue = (datum: BarData) => datum.name;

const getStackCategoryNames = (data: BarData) => data.categories.map(category => category.name);

const getStackCategoryValue = (data: BarData, categoryName: string): number =>
  data.categories.find(category => category.name === categoryName)!.value;

const createXScale = (data: BarData[], xMax: number) => {
  const xValues = getXTotalValues(data);
  const scale = scaleLinear<number>({
    domain: [0, Math.max(...xValues)],
    nice: true,
  });
  scale.rangeRound([0, xMax]);
  return scale;
};

const createYScale = (data: BarData[], yMax: number) => {
  const scale = scaleBand<string>({
    domain: data.map(getYValue),
    padding: 0.2,
  });
  scale.rangeRound([yMax, 0]);
  return scale;
};

const createColorScale = (categories: string[]) => {
  const scale = scaleOrdinal<string, string>({
    domain: categories,
    range: [purple1, purple2, purple3],
  });
  return scale;
};

type TooltipData = {
  bar: SeriesPoint<BarData>;
  key: string;
  index: number;
  height: number;
  width: number;
  x: number;
  y: number;
  color: string;
};

type BarStackProps = {
  width: number;
  height: number;
  margin?: Margin;
  data: BarData[];
  events?: boolean;
  formatYValue: (value: string) => string;
  getTooltipTitle: (d: TooltipData) => string;
  getTooltipStackCategoryText: (d: TooltipData) => string;
};

function BarStack({
  width,
  height,
  margin = defaultMargin,
  events = false,
  data,
  formatYValue,
  getTooltipTitle,
  getTooltipStackCategoryText,
}: BarStackProps) {
  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = useTooltip<TooltipData>();

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    // TooltipInPortal is rendered in a separate child of <body /> and positioned
    // with page coordinates which should be updated on scroll. consider using
    // Tooltip or TooltipWithBounds if you don't need to render inside a Portal
    scroll: true,
  });

  // categories
  const categories = useMemo(() => getStackCategoryNames(data[0]), [data]);

  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // scales
  const xScale = useMemo(() => createXScale(data, xMax), [data, xMax]);
  const yScale = useMemo(() => createYScale(data, yMax), [data, yMax]);
  const colorScale = useMemo(() => createColorScale(categories), [categories]);

  return width < 10 ? null : (
    <div style={{ position: 'relative' }}>
      <svg width={width} height={height} ref={containerRef}>
        <rect width={width} height={height} fill={background} rx={14} />
        <Group top={margin.top} left={margin.left}>
          <BarStackHorizontal
            data={data}
            keys={categories}
            height={yMax}
            y={getYValue}
            xScale={xScale}
            yScale={yScale}
            color={colorScale}
            value={getStackCategoryValue}
          >
            {barStacks =>
              barStacks.map(barStack =>
                barStack.bars.map(bar => (
                  <rect
                    key={`barstack-horizontal-${barStack.index}-${bar.index}`}
                    x={bar.x}
                    y={bar.y}
                    width={bar.width}
                    height={bar.height}
                    fill={bar.color}
                    onClick={() => {
                      if (events) alert(`clicked: ${JSON.stringify(bar)}`);
                    }}
                    onMouseLeave={() => {
                      tooltipTimeout = window.setTimeout(() => {
                        hideTooltip();
                      }, 300);
                    }}
                    onMouseMove={() => {
                      if (tooltipTimeout) clearTimeout(tooltipTimeout);
                      const top = bar.y + margin.top;
                      const left = bar.x + bar.width + margin.left;
                      showTooltip({
                        tooltipData: bar,
                        tooltipTop: top,
                        tooltipLeft: left,
                      });
                    }}
                  />
                )),
              )
            }
          </BarStackHorizontal>
          <AxisLeft
            hideAxisLine
            hideTicks
            scale={yScale}
            tickFormat={formatYValue}
            stroke={purple3}
            tickStroke={purple3}
            tickLabelProps={() => ({
              fill: purple3,
              fontSize: 11,
              textAnchor: 'end',
              dy: '0.33em',
            })}
          />
          <AxisBottom
            top={yMax}
            scale={xScale}
            stroke={purple3}
            tickStroke={purple3}
            tickLabelProps={() => ({
              fill: purple3,
              fontSize: 11,
              textAnchor: 'middle',
            })}
          />
        </Group>
      </svg>
      <div
        style={{
          position: 'absolute',
          top: margin.top / 2 - 10,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          fontSize: '14px',
        }}
      >
        <LegendOrdinal scale={colorScale} direction="row" labelMargin="0 15px 0 0" />
      </div>
      {tooltipOpen && tooltipData && (
        <TooltipInPortal top={tooltipTop} left={tooltipLeft} style={tooltipStyles}>
          <div style={{ color: colorScale(tooltipData.key) }}>
            <strong>{getTooltipTitle(tooltipData)}</strong>
          </div>
          <div>{getTooltipStackCategoryText(tooltipData)}</div>
          <div>
            <small>{formatYValue(getYValue(tooltipData.bar.data))}</small>
          </div>
        </TooltipInPortal>
      )}
    </div>
  );
}

// formatters
const parseDate = timeParse('%Y-%m-%d');
const format = timeFormat('%b %d');
const formatDate = (date: string) => format(parseDate(date) as Date);

const data = cityTemperature
  .slice(0, 12)
  .reduce<BarData[]>((allData, { date, ...cityTemperatures }) => {
    const categories = Object.entries(cityTemperatures).map(([name, value]) => ({
      name,
      value: Number(value),
    }));
    allData.push({ name: date, categories });
    return allData;
  }, []);

export type HorizontalBarStackExampleProps = Pick<
  BarStackProps,
  'width' | 'height' | 'margin' | 'events'
>;

export default function HorizontalBarStackExample({
  width,
  height,
  margin,
  events,
}: HorizontalBarStackExampleProps) {
  return (
    <BarStack
      data={data}
      width={width}
      height={height}
      margin={margin}
      events={events}
      formatYValue={formatDate}
      getTooltipTitle={tooltipData => tooltipData.key}
      getTooltipStackCategoryText={tooltipData =>
        `${getStackCategoryValue(tooltipData.bar.data, tooltipData.key)} ℉`
      }
    />
  );
}
