import React, { useMemo } from 'react';
import { BarStack as VisxBarStack } from '@visx/shape';
import { SeriesPoint } from '@visx/shape/lib/types';
import { Group } from '@visx/group';
import { Grid } from '@visx/grid';
import { AxisBottom } from '@visx/axis';
import cityTemperature, { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { timeParse, timeFormat } from 'd3-time-format';
import { useTooltip, useTooltipInPortal, defaultStyles } from '@visx/tooltip';
import { LegendOrdinal } from '@visx/legend';
import { localPoint } from '@visx/event';

const defaultMargin = { top: 40, right: 0, bottom: 0, left: 0 };

const purple1 = '#6c5efb';
const purple2 = '#c998ff';
export const purple3 = '#a44afe';
export const background = '#eaedff';
const tooltipStyles = {
  ...defaultStyles,
  minWidth: 60,
  backgroundColor: 'rgba(0,0,0,0.9)',
  color: 'white',
};

// scales
function createXScale<Datum>({
  data,
  xMax,
  getXValue,
}: {
  data: readonly Datum[];
  xMax: number;
  getXValue: (d: Datum) => string;
}) {
  const xScale = scaleBand<string>({
    domain: data.map(getXValue),
    padding: 0.2,
  });
  xScale.rangeRound([0, xMax]);
  return xScale;
}

function createYScale<Datum, StackCategory extends StackCategoryKey = StackCategoryKey>({
  data,
  keys,
  yMax,
  getYValues,
}: {
  data: readonly Datum[];
  keys: readonly StackCategory[];
  yMax: number;
  getYValues: (d: readonly Datum[], categoryNames: readonly StackCategory[]) => number[];
}) {
  const temperatureTotals = getYValues(data, keys);
  return scaleLinear<number>({
    domain: [0, Math.max(...temperatureTotals)],
    nice: true,
    range: [yMax, 0],
  });
}

function createColorScale<StackCategory extends StackCategoryKey = StackCategoryKey>(
  keys: StackCategory[],
  colors: string[],
) {
  return scaleOrdinal<StackCategory, string>({
    domain: keys,
    range: colors,
  });
}

type TooltipData<Datum, StackCategory> = {
  bar: SeriesPoint<Datum>;
  key: StackCategory;
  index: number;
  height: number;
  width: number;
  x: number;
  y: number;
  color: string;
};

type Accessors<Datum, CategoryKey extends StackCategoryKey = StackCategoryKey> = {
  getStackCategories: (d: Datum) => CategoryKey[];
  getXValue: (d: Datum) => string;
  getYValues: (d: readonly Datum[], categoryNames: readonly CategoryKey[]) => number[];
  getTooltipTitle: (d: TooltipData<Datum, CategoryKey>) => string;
  getTooltipStackCategoryText: (d: TooltipData<Datum, CategoryKey>) => string;
};

type Formatters = {
  formatXValue: (value: string) => string;
};

export type StackCategoryKey = string | number;

export type BarStackProps<Datum, CategoryKey extends StackCategoryKey = StackCategoryKey> = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  events?: boolean;
  data: Datum[];
  accessors: Accessors<Datum, CategoryKey>;
  categoryColors: string[];
  formatters: Formatters;
};

let tooltipTimeout: number;

function BarStack<Datum, CategoryKey extends StackCategoryKey = StackCategoryKey>({
  width,
  height,
  events = false,
  margin = defaultMargin,
  data,
  accessors: {
    getStackCategories,
    getXValue,
    getYValues,
    getTooltipTitle,
    getTooltipStackCategoryText,
  },
  categoryColors,
  formatters: { formatXValue },
}: BarStackProps<Datum, CategoryKey>) {
  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = useTooltip<TooltipData<Datum, CategoryKey>>();

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    // TooltipInPortal is rendered in a separate child of <body /> and positioned
    // with page coordinates which should be updated on scroll. consider using
    // Tooltip or TooltipWithBounds if you don't need to render inside a Portal
    scroll: true,
  });

  const stackCategories = useMemo(() => getStackCategories(data[0]), [data, getStackCategories]);

  // bounds
  const xMax = width;
  const yMax = height - margin.top - 100;

  // scales
  const xScale = useMemo(() => createXScale({ data, xMax, getXValue }), [data, xMax, getXValue]);
  const yScale = useMemo(() => createYScale({ data, keys: stackCategories, yMax, getYValues }), [
    data,
    stackCategories,
    yMax,
    getYValues,
  ]);
  const colorScale = useMemo(() => createColorScale(stackCategories, categoryColors), [
    stackCategories,
    categoryColors,
  ]);

  if (width < 10) return null;

  return (
    <div style={{ position: 'relative' }}>
      <svg ref={containerRef} width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} fill={background} rx={14} />
        <Grid
          top={margin.top}
          left={margin.left}
          xScale={xScale}
          yScale={yScale}
          width={xMax}
          height={yMax}
          stroke="black"
          strokeOpacity={0.1}
          xOffset={xScale.bandwidth() / 2}
        />
        <Group top={margin.top}>
          <VisxBarStack<Datum, CategoryKey>
            data={data}
            keys={stackCategories}
            x={getXValue}
            xScale={xScale}
            yScale={yScale}
            color={colorScale}
          >
            {barStacks =>
              barStacks.map(barStack =>
                barStack.bars.map(bar => (
                  <rect
                    key={`bar-stack-${barStack.index}-${bar.index}`}
                    x={bar.x}
                    y={bar.y}
                    height={bar.height}
                    width={bar.width}
                    fill={bar.color}
                    onClick={() => {
                      if (events) alert(`clicked: ${JSON.stringify(bar)}`);
                    }}
                    onMouseLeave={() => {
                      tooltipTimeout = window.setTimeout(() => {
                        hideTooltip();
                      }, 300);
                    }}
                    onMouseMove={event => {
                      if (tooltipTimeout) clearTimeout(tooltipTimeout);
                      // TooltipInPortal expects coordinates to be relative to containerRef
                      // localPoint returns coordinates relative to the nearest SVG, which
                      // is what containerRef is set to in this example.
                      const eventSvgCoords = localPoint(event);
                      const left = bar.x + bar.width / 2;
                      showTooltip({
                        tooltipData: bar,
                        tooltipTop: eventSvgCoords?.y,
                        tooltipLeft: left,
                      });
                    }}
                  />
                )),
              )
            }
          </VisxBarStack>
        </Group>
        <AxisBottom
          top={yMax + margin.top}
          scale={xScale}
          tickFormat={formatXValue}
          stroke={purple3}
          tickStroke={purple3}
          tickLabelProps={() => ({
            fill: purple3,
            fontSize: 11,
            textAnchor: 'middle',
          })}
        />
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
            <small>{formatXValue(getXValue(tooltipData.bar.data))}</small>
          </div>
        </TooltipInPortal>
      )}
    </div>
  );
}

export type CityName = 'New York' | 'San Francisco' | 'Austin';

// accessors
const getDate = (d: CityTemperature): string => d.date;
const getKeys = (data: CityTemperature): CityName[] =>
  Object.keys(data).filter(d => d !== 'date') as CityName[];

const getTemperatureTotals = (data: readonly CityTemperature[], keys: readonly CityName[]) => {
  return data.reduce<number[]>((allTotals, currentDate) => {
    const totalTemperature = keys.reduce((dailyTotal, k) => {
      dailyTotal += Number(currentDate[k]);
      return dailyTotal;
    }, 0);

    allTotals.push(totalTemperature);
    return allTotals;
  }, []);
};

const accessors: Accessors<CityTemperature, CityName> = {
  getStackCategories: getKeys,
  getXValue: getDate,
  getYValues: getTemperatureTotals,
  getTooltipTitle: toolTipData => toolTipData.key,
  getTooltipStackCategoryText: tooltipData => `${tooltipData.bar.data[tooltipData.key]}℉`,
};

// formatters.
const parseDate = timeParse('%Y-%m-%d');
const format = timeFormat('%b %d');
const formatDate = (date: string) => format(parseDate(date) as Date);
const formatters = { formatXValue: formatDate };

const stackCategoryColors = [purple1, purple2, purple3];

export type ExampleProps = Pick<
  BarStackProps<CityTemperature, CityName>,
  'width' | 'events' | 'height' | 'margin'
>;

const citiesTemperatures = cityTemperature.slice(0, 12);

export default function Example({ width, height, margin, events }: ExampleProps) {
  return (
    <BarStack
      width={width}
      margin={margin}
      height={height}
      events={events}
      data={citiesTemperatures}
      accessors={accessors}
      categoryColors={stackCategoryColors}
      formatters={formatters}
    />
  );
}
