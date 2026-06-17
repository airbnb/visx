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
import { GridRows } from '@visx/grid';
import { ParentSize } from '@visx/responsive';
import { useScale } from '@visx/scale/react';
import { AreaStack } from '@visx/shape';
import { ThemeScope } from '@visx/theme';
import { useAxisStyle, useColor, useColorScale, useGridStyle } from '@visx/theme/react';
import { ChartLegend } from './chart-ui';

export type StackedAreaChartKey = 'desktop' | 'mobile' | 'tablet';

export type StackedAreaChartDatum = {
  x: string;
} & Record<StackedAreaChartKey, number>;

type StackedAreaChartSeriesDatum = {
  x: string;
  y: number;
  series: StackedAreaChartKey;
};

type NonEmptyStackedAreaChartSeriesData = [
  StackedAreaChartSeriesDatum[],
  ...StackedAreaChartSeriesDatum[][],
];

type NonEmptyStackedAreaChartSeriesConfig = [
  ChartA11ySeriesConfig<StackedAreaChartSeriesDatum>,
  ...ChartA11ySeriesConfig<StackedAreaChartSeriesDatum>[],
];

export type StackedAreaChartMargin = MarginShape;

export type StackedAreaChartProps = Omit<
  SVGProps<SVGSVGElement>,
  'children' | 'height' | 'width'
> & {
  data?: StackedAreaChartDatum[];
  height?: number;
  keys?: StackedAreaChartKey[];
  margin?: StackedAreaChartMargin;
  showLegend?: boolean;
  showLiveRegion?: boolean;
  title?: string;
  width?: number;
  xLabel?: string;
  xMinTickSpacing?: number;
  xTickFormat?: AxisTickFormatter<string>;
  xTickValues?: string[];
  yLabel?: string;
  yMinTickSpacing?: number;
  yNumTicks?: number;
  yTickFormat?: AxisTickFormatter<number>;
  yTickValues?: number[];
};

type StackedAreaChartSvgProps = Required<
  Pick<
    StackedAreaChartProps,
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
    StackedAreaChartProps,
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

const defaultKeys: StackedAreaChartKey[] = ['desktop', 'mobile', 'tablet'];

const defaultData: StackedAreaChartDatum[] = [
  { x: 'Jan', desktop: 26, mobile: 18, tablet: 8 },
  { x: 'Feb', desktop: 31, mobile: 23, tablet: 10 },
  { x: 'Mar', desktop: 29, mobile: 26, tablet: 13 },
  { x: 'Apr', desktop: 36, mobile: 31, tablet: 15 },
  { x: 'May', desktop: 42, mobile: 34, tablet: 17 },
  { x: 'Jun', desktop: 48, mobile: 38, tablet: 19 },
];

const defaultMargin = {
  top: 24,
  right: 24,
  bottom: 52,
  left: 48,
};

function formatKey(key: string) {
  return key.charAt(0).toUpperCase() + key.slice(1);
}

function getAreaValue(datum: StackedAreaChartDatum, key: StackedAreaChartKey) {
  const value = datum[key];

  return Number.isFinite(value) ? value : 0;
}

function getYDomain(
  data: readonly StackedAreaChartDatum[],
  keys: readonly StackedAreaChartKey[],
): [number, number] {
  return getPositiveDomain(
    data.map((datum) => keys.reduce((sum, key) => sum + Math.max(0, getAreaValue(datum, key)), 0)),
  );
}

function getStackTop(
  datum: StackedAreaChartDatum,
  keys: readonly StackedAreaChartKey[],
  seriesIndex: number,
) {
  return keys
    .slice(0, seriesIndex + 1)
    .reduce((sum, key) => sum + Math.max(0, getAreaValue(datum, key)), 0);
}

function formatY(value: number) {
  return new Intl.NumberFormat('en-US').format(value);
}

function StackedAreaChartSvg({
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
  xTickFormat,
  xTickValues,
  yLabel,
  yMinTickSpacing = 48,
  yNumTicks,
  yTickFormat,
  yTickValues,
  ...svgProps
}: StackedAreaChartSvgProps) {
  const legendHeight = showLegend ? 28 : 0;
  const dimensions = useChartDimensions({
    width,
    height: Math.max(0, height - legendHeight),
    margin,
  });
  const xDomain = useMemo(() => data.map((datum) => datum.x), [data]);
  const yDomain = useMemo(() => getYDomain(data, keys), [data, keys]);
  const visibleXTickValues = useMemo(
    () =>
      xTickValues ??
      getVisibleTickValues(xDomain, {
        axisLength: dimensions.innerWidth,
        minTickSpacing: xMinTickSpacing,
      }),
    [dimensions.innerWidth, xDomain, xMinTickSpacing, xTickValues],
  );
  const visibleYNumTicks =
    yTickValues == null
      ? yNumTicks ??
        getAxisTickCount({
          axisLength: dimensions.innerHeight,
          maxTicks: 5,
          minTickSpacing: yMinTickSpacing,
        })
      : undefined;
  const seriesData = useMemo(
    () =>
      keys.map((key) =>
        data.map((datum) => ({
          x: datum.x,
          y: getAreaValue(datum, key),
          series: key,
        })),
      ),
    [data, keys],
  );
  const a11yData = useMemo(
    () => (keys.length > 0 ? (seriesData as NonEmptyStackedAreaChartSeriesData) : []),
    [keys.length, seriesData],
  );
  const a11ySeries = useMemo(
    () =>
      (keys.length > 0
        ? keys.map((key) => ({ label: formatKey(key) }))
        : [{ label: title }]) as NonEmptyStackedAreaChartSeriesConfig,
    [keys, title],
  );
  const xScale = useScale({
    type: 'point',
    domain: xDomain,
    range: [0, dimensions.innerWidth],
    padding: 0.35,
  });
  const yScale = useScale({
    type: 'linear',
    domain: yDomain,
    range: [dimensions.innerHeight, 0],
    nice: true,
  });
  const xAxisStyle = useAxisStyle('bottom');
  const yAxisStyle = useAxisStyle('left');
  const gridStyle = useGridStyle();
  const pointColor = useColor('background');
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
  const a11y = useChartA11y<StackedAreaChartSeriesDatum>({
    id,
    title,
    chartType: 'area',
    data: a11yData,
    x: (datum) => datum.x,
    y: (datum) => datum.y,
    xLabel,
    yLabel,
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
            <GridRows
              numTicks={visibleYNumTicks}
              scale={yScale}
              stroke={gridStyle.stroke}
              strokeWidth={gridStyle.strokeWidth}
              tickValues={yTickValues}
              width={dimensions.innerWidth}
            />
            <AxisLeft
              label={yLabel}
              labelOffset={yAxisStyle.labelOffset}
              labelProps={yAxisStyle.labelProps}
              numTicks={visibleYNumTicks}
              scale={yScale}
              stroke={yAxisStyle.stroke}
              strokeWidth={yAxisStyle.strokeWidth}
              tickFormat={
                yTickFormat ? (value, index) => yTickFormat(Number(value), index) : undefined
              }
              tickLabelProps={yAxisStyle.tickLabelProps}
              tickLength={yAxisStyle.tickLength}
              tickStroke={yAxisStyle.tickStroke}
              tickValues={yTickValues}
            />
            <AxisBottom
              label={xLabel}
              labelOffset={xAxisStyle.labelOffset}
              labelProps={xAxisStyle.labelProps}
              scale={xScale}
              stroke={xAxisStyle.stroke}
              strokeWidth={xAxisStyle.strokeWidth}
              tickFormat={xTickFormat}
              tickLabelProps={xAxisStyle.tickLabelProps}
              tickLength={xAxisStyle.tickLength}
              tickStroke={xAxisStyle.tickStroke}
              tickValues={visibleXTickValues}
              top={dimensions.innerHeight}
            />
            <AreaStack
              data={data}
              keys={keys}
              x={(datum) => xScale(datum.data.x) ?? 0}
              y0={(d) => yScale(d[0]) ?? dimensions.innerHeight}
              y1={(d) => yScale(d[1]) ?? dimensions.innerHeight}
              color={(key) => colorScale(key as StackedAreaChartKey)}
              value={(datum, key) => Math.max(0, getAreaValue(datum, key as StackedAreaChartKey))}
            >
              {({ stacks, path }) =>
                stacks.map((series, seriesIndex) => (
                  <path
                    key={series.key}
                    d={path(series) ?? undefined}
                    fill={colorScale(series.key as StackedAreaChartKey)}
                    fillOpacity={0.68}
                    data-stacked-area-chart-area=""
                    {...a11y.getSeriesProps(seriesIndex)}
                  />
                ))
              }
            </AreaStack>
            {keys.map((key, seriesIndex) => {
              const lineColor = colorScale(key);

              return (
                <g key={key}>
                  {data.map((datum, index) => {
                    const cx = xScale(datum.x);
                    const cy = yScale(getStackTop(datum, keys, seriesIndex));

                    if (cx == null || cy == null) {
                      return null;
                    }

                    return (
                      <circle
                        key={`${key}-${datum.x}-${index}`}
                        cx={cx}
                        cy={cy}
                        r={3.5}
                        fill={pointColor}
                        stroke={lineColor}
                        strokeWidth={2}
                        data-stacked-area-chart-point=""
                        {...a11y.getPointProps(seriesIndex, index)}
                      />
                    );
                  })}
                </g>
              );
            })}
          </g>
        </svg>
      </div>
      <a11y.DataTable />
      {showLiveRegion && <a11y.Announcer />}
    </ThemeScope>
  );
}

export function StackedAreaChart({
  data = defaultData,
  height = 320,
  keys = defaultKeys,
  width = 640,
  ...props
}: StackedAreaChartProps) {
  return (
    <ParentSize
      debounceTime={10}
      ignoreDimensions={['height', 'top', 'left']}
      initialSize={{ width, height }}
      style={{ width: '100%', height }}
    >
      {({ width: measuredWidth }) => (
        <StackedAreaChartSvg
          {...props}
          data={data}
          height={height}
          id={props.id}
          keys={keys}
          margin={props.margin ?? defaultMargin}
          showLegend={props.showLegend ?? true}
          showLiveRegion={props.showLiveRegion ?? true}
          title={props.title ?? 'Stacked area chart'}
          width={getResponsiveWidth(measuredWidth, width)}
          xLabel={props.xLabel ?? 'Category'}
          yLabel={props.yLabel ?? 'Value'}
        />
      )}
    </ParentSize>
  );
}
