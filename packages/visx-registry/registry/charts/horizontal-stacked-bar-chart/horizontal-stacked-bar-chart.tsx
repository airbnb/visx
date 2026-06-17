'use client';

import type { SVGProps } from 'react';
import { useMemo } from 'react';
import { useChartA11y, type ChartA11ySeriesConfig } from '@visx/a11y/react';
import { AxisBottom, AxisLeft } from '@visx/axis';
import {
  getAxisTickCount,
  getPositiveDomain,
  getResponsiveWidth,
  getVisibleTickValues,
  type AxisTickFormatter,
  type MarginShape,
  useChartDimensions,
} from '@visx/chart';
import { GridColumns } from '@visx/grid';
import { ParentSize } from '@visx/responsive';
import { useScale } from '@visx/scale/react';
import { BarRounded } from '@visx/shape';
import { ThemeScope } from '@visx/theme';
import { useAxisStyle, useColorScale, useGridStyle } from '@visx/theme/react';
import { ChartLegend } from './chart-ui';

export type HorizontalStackedBarChartKey = 'desktop' | 'mobile' | 'tablet';

export type HorizontalStackedBarChartDatum = {
  x: string;
} & Record<HorizontalStackedBarChartKey, number>;

type HorizontalStackedBarChartSeriesDatum = {
  x: string;
  y: number;
  series: HorizontalStackedBarChartKey;
};

type NonEmptyHorizontalStackedBarChartSeriesData = [
  HorizontalStackedBarChartSeriesDatum[],
  ...HorizontalStackedBarChartSeriesDatum[][],
];

type NonEmptyHorizontalStackedBarChartSeriesConfig = [
  ChartA11ySeriesConfig<HorizontalStackedBarChartSeriesDatum>,
  ...ChartA11ySeriesConfig<HorizontalStackedBarChartSeriesDatum>[],
];

export type HorizontalStackedBarChartMargin = MarginShape;

export type HorizontalStackedBarChartProps = Omit<
  SVGProps<SVGSVGElement>,
  'children' | 'height' | 'width'
> & {
  data?: HorizontalStackedBarChartDatum[];
  height?: number;
  keys?: HorizontalStackedBarChartKey[];
  margin?: HorizontalStackedBarChartMargin;
  showLegend?: boolean;
  showLiveRegion?: boolean;
  title?: string;
  width?: number;
  xLabel?: string;
  xMinTickSpacing?: number;
  xNumTicks?: number;
  xTickFormat?: AxisTickFormatter<number>;
  xTickValues?: number[];
  yLabel?: string;
  yMinTickSpacing?: number;
  yTickFormat?: AxisTickFormatter<string>;
  yTickValues?: string[];
};

type HorizontalStackedBarChartSvgProps = Required<
  Pick<
    HorizontalStackedBarChartProps,
    | 'data'
    | 'height'
    | 'keys'
    | 'margin'
    | 'showLegend'
    | 'showLiveRegion'
    | 'title'
    | 'width'
    | 'xLabel'
    | 'yLabel'
  >
> &
  Omit<
    HorizontalStackedBarChartProps,
    | 'data'
    | 'height'
    | 'keys'
    | 'margin'
    | 'showLegend'
    | 'showLiveRegion'
    | 'title'
    | 'width'
    | 'xLabel'
    | 'yLabel'
  >;

const defaultKeys: HorizontalStackedBarChartKey[] = ['desktop', 'mobile', 'tablet'];

const defaultData: HorizontalStackedBarChartDatum[] = [
  { x: 'Enterprise', desktop: 46, mobile: 34, tablet: 18 },
  { x: 'Mid-market', desktop: 38, mobile: 42, tablet: 20 },
  { x: 'Startup', desktop: 28, mobile: 48, tablet: 14 },
  { x: 'Self serve', desktop: 22, mobile: 56, tablet: 12 },
];

const defaultMargin = {
  top: 24,
  right: 24,
  bottom: 52,
  left: 92,
};

function formatKey(key: string) {
  return key.charAt(0).toUpperCase() + key.slice(1);
}

function getStackValue(datum: HorizontalStackedBarChartDatum, key: HorizontalStackedBarChartKey) {
  const value = datum[key];

  return Number.isFinite(value) ? value : 0;
}

function getXDomain(
  data: readonly HorizontalStackedBarChartDatum[],
  keys: readonly HorizontalStackedBarChartKey[],
): [number, number] {
  return getPositiveDomain(
    data.map((datum) => keys.reduce((sum, key) => sum + Math.max(0, getStackValue(datum, key)), 0)),
  );
}

function getLastVisibleKey(
  datum: HorizontalStackedBarChartDatum,
  keys: readonly HorizontalStackedBarChartKey[],
) {
  for (let index = keys.length - 1; index >= 0; index -= 1) {
    const key = keys[index];

    if (key && getStackValue(datum, key) > 0) {
      return key;
    }
  }

  return null;
}

function formatY(value: number) {
  return new Intl.NumberFormat('en-US').format(value);
}

function HorizontalStackedBarChartSvg({
  className,
  data,
  height,
  id,
  keys,
  margin,
  showLegend,
  showLiveRegion,
  style,
  title,
  width,
  xLabel,
  xMinTickSpacing = 48,
  xNumTicks,
  xTickFormat,
  xTickValues,
  yLabel,
  yMinTickSpacing = 32,
  yTickFormat,
  yTickValues,
  ...svgProps
}: HorizontalStackedBarChartSvgProps) {
  const legendHeight = showLegend ? 28 : 0;
  const dimensions = useChartDimensions({
    width,
    height: Math.max(0, height - legendHeight),
    margin,
  });
  const yDomain = useMemo(() => data.map((datum) => datum.x), [data]);
  const xDomain = useMemo(() => getXDomain(data, keys), [data, keys]);
  const visibleYTickValues = useMemo(
    () =>
      yTickValues ??
      getVisibleTickValues(yDomain, {
        axisLength: dimensions.innerHeight,
        minTickSpacing: yMinTickSpacing,
      }),
    [dimensions.innerHeight, yDomain, yMinTickSpacing, yTickValues],
  );
  const visibleXNumTicks =
    xTickValues == null
      ? xNumTicks ??
        getAxisTickCount({
          axisLength: dimensions.innerWidth,
          maxTicks: 5,
          minTickSpacing: xMinTickSpacing,
        })
      : undefined;
  const lastVisibleKeyByCategory = useMemo(
    () => new Map(data.map((datum) => [datum.x, getLastVisibleKey(datum, keys)])),
    [data, keys],
  );
  const seriesData = useMemo(
    () =>
      keys.map((key) =>
        data.map((datum) => ({
          x: datum.x,
          y: getStackValue(datum, key),
          series: key,
        })),
      ),
    [data, keys],
  );
  const a11yData = useMemo(
    () => (keys.length > 0 ? (seriesData as NonEmptyHorizontalStackedBarChartSeriesData) : []),
    [keys.length, seriesData],
  );
  const a11ySeries = useMemo(
    () =>
      (keys.length > 0
        ? keys.map((key) => ({ label: formatKey(key) }))
        : [{ label: title }]) as NonEmptyHorizontalStackedBarChartSeriesConfig,
    [keys, title],
  );
  const xScale = useScale({
    type: 'linear',
    domain: xDomain,
    range: [0, dimensions.innerWidth],
    nice: true,
  });
  const yScale = useScale({
    type: 'band',
    domain: yDomain,
    range: [0, dimensions.innerHeight],
    padding: 0.32,
  });
  const xAxisStyle = useAxisStyle('bottom');
  const yAxisStyle = useAxisStyle('left');
  const gridStyle = useGridStyle();
  const colorScale = useColorScale(keys);
  const legendItems = useMemo(
    () =>
      keys.map((key) => ({
        key,
        label: formatKey(key),
        color: colorScale(key),
      })),
    [colorScale, keys],
  );
  const a11y = useChartA11y<HorizontalStackedBarChartSeriesDatum>({
    id,
    title,
    chartType: 'bar',
    data: a11yData,
    x: (datum) => datum.x,
    y: (datum) => datum.y,
    xLabel: yLabel,
    yLabel: xLabel,
    formatY,
    keyboardNavEnabled: data.length > 0 && keys.length > 0,
    series: a11ySeries,
  });

  return (
    <ThemeScope as={false}>
      <div style={{ position: 'relative', width: '100%', height }}>
        {showLegend && (
          <ChartLegend
            items={legendItems}
            style={{
              height: legendHeight,
              justifyContent: 'flex-start',
            }}
          />
        )}
        <svg
          {...svgProps}
          {...a11y.svgProps}
          id={a11y.id}
          className={className}
          width={dimensions.width}
          height={dimensions.height}
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          style={{
            display: 'block',
            width: '100%',
            height: dimensions.height,
            overflow: 'visible',
            ...style,
          }}
        >
          <desc id={a11y.descriptionId}>{a11y.description}</desc>
          <g transform={`translate(${dimensions.margin.left} ${dimensions.margin.top})`}>
            <GridColumns
              height={dimensions.innerHeight}
              numTicks={visibleXNumTicks}
              scale={xScale}
              stroke={gridStyle.stroke}
              strokeWidth={gridStyle.strokeWidth}
              tickValues={xTickValues}
            />
            <AxisLeft
              label={yLabel}
              labelOffset={yAxisStyle.labelOffset}
              labelProps={yAxisStyle.labelProps}
              scale={yScale}
              stroke={yAxisStyle.stroke}
              strokeWidth={yAxisStyle.strokeWidth}
              tickFormat={yTickFormat}
              tickLabelProps={yAxisStyle.tickLabelProps}
              tickLength={yAxisStyle.tickLength}
              tickStroke={yAxisStyle.tickStroke}
              tickValues={visibleYTickValues}
            />
            <AxisBottom
              label={xLabel}
              labelOffset={xAxisStyle.labelOffset}
              labelProps={xAxisStyle.labelProps}
              numTicks={visibleXNumTicks}
              scale={xScale}
              stroke={xAxisStyle.stroke}
              strokeWidth={xAxisStyle.strokeWidth}
              tickFormat={
                xTickFormat ? (value, index) => xTickFormat(Number(value), index) : undefined
              }
              tickLabelProps={xAxisStyle.tickLabelProps}
              tickLength={xAxisStyle.tickLength}
              tickStroke={xAxisStyle.tickStroke}
              tickValues={xTickValues}
              top={dimensions.innerHeight}
            />
            {keys.map((key, seriesIndex) => (
              <g key={key} {...a11y.getSeriesProps(seriesIndex)}>
                {data.map((datum, index) => {
                  const y = yScale(datum.x);
                  const barHeight = yScale.bandwidth();
                  const startValue = keys
                    .slice(0, seriesIndex)
                    .reduce((sum, nextKey) => sum + Math.max(0, getStackValue(datum, nextKey)), 0);
                  const value = Math.max(0, getStackValue(datum, key));
                  const x0 = xScale(startValue);
                  const x1 = xScale(startValue + value);

                  if (y == null || x0 == null || x1 == null || value <= 0) {
                    return null;
                  }

                  const isLastVisible = lastVisibleKeyByCategory.get(datum.x) === key;

                  return isLastVisible ? (
                    <BarRounded
                      key={`${key}-${datum.x}-${index}`}
                      x={x0}
                      y={y}
                      width={Math.max(0, x1 - x0)}
                      height={barHeight}
                      radius={4}
                      right
                      fill={colorScale(key)}
                      data-horizontal-stacked-bar-chart-bar=""
                      {...a11y.getPointProps(seriesIndex, index)}
                    />
                  ) : (
                    <rect
                      key={`${key}-${datum.x}-${index}`}
                      x={x0}
                      y={y}
                      width={Math.max(0, x1 - x0)}
                      height={barHeight}
                      fill={colorScale(key)}
                      data-horizontal-stacked-bar-chart-bar=""
                      {...a11y.getPointProps(seriesIndex, index)}
                    />
                  );
                })}
              </g>
            ))}
          </g>
        </svg>
      </div>
      <a11y.DataTable />
      {showLiveRegion && <a11y.Announcer />}
    </ThemeScope>
  );
}

export function HorizontalStackedBarChart({
  data = defaultData,
  height = 320,
  keys = defaultKeys,
  width = 640,
  ...props
}: HorizontalStackedBarChartProps) {
  return (
    <ParentSize
      debounceTime={10}
      ignoreDimensions={['height', 'top', 'left']}
      initialSize={{ width, height }}
      style={{ width: '100%', height }}
    >
      {({ width: measuredWidth }) => (
        <HorizontalStackedBarChartSvg
          {...props}
          data={data}
          height={height}
          id={props.id}
          keys={keys}
          margin={props.margin ?? defaultMargin}
          showLegend={props.showLegend ?? true}
          showLiveRegion={props.showLiveRegion ?? true}
          title={props.title ?? 'Horizontal stacked bar chart'}
          width={getResponsiveWidth(measuredWidth, width)}
          xLabel={props.xLabel ?? 'Value'}
          yLabel={props.yLabel ?? 'Category'}
        />
      )}
    </ParentSize>
  );
}
