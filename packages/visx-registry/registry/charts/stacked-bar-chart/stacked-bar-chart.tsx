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
import { BarStack } from '@visx/shape';
import { ThemeScope } from '@visx/theme';
import { useAxisStyle, useColorScale, useGridStyle } from '@visx/theme/react';
import { ChartLegend } from './chart-ui';

export type StackedBarChartKey = 'desktop' | 'mobile' | 'tablet';

export type StackedBarChartDatum = {
  x: string;
} & Record<StackedBarChartKey, number>;

type StackedBarChartSeriesDatum = {
  x: string;
  y: number;
  series: StackedBarChartKey;
};

type NonEmptyStackedBarChartSeriesData = [
  StackedBarChartSeriesDatum[],
  ...StackedBarChartSeriesDatum[][],
];

type NonEmptyStackedBarChartSeriesConfig = [
  ChartA11ySeriesConfig<StackedBarChartSeriesDatum>,
  ...ChartA11ySeriesConfig<StackedBarChartSeriesDatum>[],
];

export type StackedBarChartMargin = MarginShape;

export type StackedBarChartProps = Omit<
  SVGProps<SVGSVGElement>,
  'children' | 'height' | 'width'
> & {
  data?: StackedBarChartDatum[];
  height?: number;
  keys?: StackedBarChartKey[];
  margin?: StackedBarChartMargin;
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

type StackedBarChartSvgProps = Required<
  Pick<
    StackedBarChartProps,
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
    StackedBarChartProps,
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

const defaultKeys: StackedBarChartKey[] = ['desktop', 'mobile', 'tablet'];

const defaultData: StackedBarChartDatum[] = [
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

function getStackValue(datum: StackedBarChartDatum, key: StackedBarChartKey) {
  const value = datum[key];

  return Number.isFinite(value) ? value : 0;
}

function getYDomain(
  data: readonly StackedBarChartDatum[],
  keys: readonly StackedBarChartKey[],
): [number, number] {
  return getPositiveDomain(
    data.map((datum) => keys.reduce((sum, key) => sum + Math.max(0, getStackValue(datum, key)), 0)),
  );
}

function formatY(value: number) {
  return new Intl.NumberFormat('en-US').format(value);
}

function getTopRoundedBarPath({
  height,
  radius,
  width,
  x,
  y,
}: {
  height: number;
  radius: number;
  width: number;
  x: number;
  y: number;
}) {
  const r = Math.min(radius, width / 2, height);
  const right = x + width;
  const bottom = y + height;

  return [
    `M ${x} ${bottom}`,
    `L ${x} ${y + r}`,
    `Q ${x} ${y} ${x + r} ${y}`,
    `L ${right - r} ${y}`,
    `Q ${right} ${y} ${right} ${y + r}`,
    `L ${right} ${bottom}`,
    'Z',
  ].join(' ');
}

function StackedBarChartSvg({
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
}: StackedBarChartSvgProps) {
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
          y: getStackValue(datum, key),
          series: key,
        })),
      ),
    [data, keys],
  );
  const a11yData = useMemo(
    () => (keys.length > 0 ? (seriesData as NonEmptyStackedBarChartSeriesData) : []),
    [keys.length, seriesData],
  );
  const a11ySeries = useMemo(
    () =>
      (keys.length > 0
        ? keys.map((key) => ({ label: formatKey(key) }))
        : [{ label: title }]) as NonEmptyStackedBarChartSeriesConfig,
    [keys, title],
  );
  const xScale = useScale({
    type: 'band',
    domain: xDomain,
    range: [0, dimensions.innerWidth],
    padding: 0.28,
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
  const a11y = useChartA11y<StackedBarChartSeriesDatum>({
    id,
    title,
    chartType: 'bar',
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
            <BarStack
              data={data}
              keys={keys}
              x={(datum) => datum.x}
              xScale={xScale}
              yScale={yScale}
              color={(key) => colorScale(key as StackedBarChartKey)}
              value={(datum, key) => getStackValue(datum, key as StackedBarChartKey)}
            >
              {(barStacks) => {
                const topBarSeriesByIndex = new Map<number, number>();
                const topBarYByIndex = new Map<number, number>();

                barStacks.forEach((barStack, seriesIndex) => {
                  barStack.bars.forEach((bar) => {
                    if (bar.height <= 0) {
                      return;
                    }

                    const currentY = topBarYByIndex.get(bar.index);

                    if (currentY == null || bar.y < currentY) {
                      topBarYByIndex.set(bar.index, bar.y);
                      topBarSeriesByIndex.set(bar.index, seriesIndex);
                    }
                  });
                });

                return barStacks.map((barStack, seriesIndex) => (
                  <g key={barStack.key} {...a11y.getSeriesProps(seriesIndex)}>
                    {barStack.bars.map((bar) => {
                      if (bar.height <= 0) {
                        return null;
                      }

                      const isTopBar = topBarSeriesByIndex.get(bar.index) === seriesIndex;
                      const pointProps = a11y.getPointProps(seriesIndex, bar.index);

                      return isTopBar ? (
                        <path
                          key={`${barStack.key}-${bar.index}`}
                          d={getTopRoundedBarPath({
                            x: bar.x,
                            y: bar.y,
                            width: bar.width,
                            height: bar.height,
                            radius: 4,
                          })}
                          fill={bar.color}
                          data-stacked-bar-chart-bar=""
                          {...pointProps}
                        />
                      ) : (
                        <rect
                          key={`${barStack.key}-${bar.index}`}
                          x={bar.x}
                          y={bar.y}
                          width={bar.width}
                          height={bar.height}
                          fill={bar.color}
                          data-stacked-bar-chart-bar=""
                          {...pointProps}
                        />
                      );
                    })}
                  </g>
                ));
              }}
            </BarStack>
          </g>
        </svg>
      </div>
      <a11y.DataTable />
      {showLiveRegion && <a11y.Announcer />}
    </ThemeScope>
  );
}

export function StackedBarChart({
  data = defaultData,
  height = 320,
  keys = defaultKeys,
  width = 640,
  ...props
}: StackedBarChartProps) {
  return (
    <ParentSize
      debounceTime={10}
      ignoreDimensions={['height', 'top', 'left']}
      initialSize={{ width, height }}
      style={{ width: '100%', height }}
    >
      {({ width: measuredWidth }) => (
        <StackedBarChartSvg
          {...props}
          data={data}
          height={height}
          id={props.id}
          keys={keys}
          margin={props.margin ?? defaultMargin}
          showLegend={props.showLegend ?? true}
          showLiveRegion={props.showLiveRegion ?? true}
          title={props.title ?? 'Stacked bar chart'}
          width={getResponsiveWidth(measuredWidth, width)}
          xLabel={props.xLabel ?? 'Category'}
          yLabel={props.yLabel ?? 'Value'}
        />
      )}
    </ParentSize>
  );
}
