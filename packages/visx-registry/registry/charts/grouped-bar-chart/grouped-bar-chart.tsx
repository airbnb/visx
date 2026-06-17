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
import { BarRounded } from '@visx/shape';
import { ThemeScope } from '@visx/theme';
import { useAxisStyle, useColorScale, useGridStyle } from '@visx/theme/react';
import { ChartLegend } from './chart-ui';

export type GroupedBarChartKey = 'desktop' | 'mobile' | 'tablet';

export type GroupedBarChartDatum = {
  x: string;
} & Record<GroupedBarChartKey, number>;

type GroupedBarChartSeriesDatum = {
  x: string;
  y: number;
  series: GroupedBarChartKey;
};

type NonEmptyGroupedBarChartSeriesData = [
  GroupedBarChartSeriesDatum[],
  ...GroupedBarChartSeriesDatum[][],
];

type NonEmptyGroupedBarChartSeriesConfig = [
  ChartA11ySeriesConfig<GroupedBarChartSeriesDatum>,
  ...ChartA11ySeriesConfig<GroupedBarChartSeriesDatum>[],
];

export type GroupedBarChartMargin = MarginShape;

export type GroupedBarChartProps = Omit<
  SVGProps<SVGSVGElement>,
  'children' | 'height' | 'width'
> & {
  data?: GroupedBarChartDatum[];
  height?: number;
  keys?: GroupedBarChartKey[];
  margin?: GroupedBarChartMargin;
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

type GroupedBarChartSvgProps = Required<
  Pick<
    GroupedBarChartProps,
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
    GroupedBarChartProps,
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

const defaultKeys: GroupedBarChartKey[] = ['desktop', 'mobile', 'tablet'];

const defaultData: GroupedBarChartDatum[] = [
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

function getBarValue(datum: GroupedBarChartDatum, key: GroupedBarChartKey) {
  const value = datum[key];

  return Number.isFinite(value) ? value : 0;
}

function getYDomain(
  data: readonly GroupedBarChartDatum[],
  keys: readonly GroupedBarChartKey[],
): [number, number] {
  return getPositiveDomain(data.flatMap((datum) => keys.map((key) => getBarValue(datum, key))));
}

function formatY(value: number) {
  return new Intl.NumberFormat('en-US').format(value);
}

function GroupedBarChartSvg({
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
}: GroupedBarChartSvgProps) {
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
          y: getBarValue(datum, key),
          series: key,
        })),
      ),
    [data, keys],
  );
  const a11yData = useMemo(
    () => (keys.length > 0 ? (seriesData as NonEmptyGroupedBarChartSeriesData) : []),
    [keys.length, seriesData],
  );
  const a11ySeries = useMemo(
    () =>
      (keys.length > 0
        ? keys.map((key) => ({ label: formatKey(key) }))
        : [{ label: title }]) as NonEmptyGroupedBarChartSeriesConfig,
    [keys, title],
  );
  const xScale = useScale({
    type: 'band',
    domain: xDomain,
    range: [0, dimensions.innerWidth],
    padding: 0.24,
  });
  const groupScale = useScale({
    type: 'band',
    domain: keys,
    range: [0, Math.max(0, xScale.bandwidth())],
    padding: 0.12,
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
  const a11y = useChartA11y<GroupedBarChartSeriesDatum>({
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
            {keys.map((key, seriesIndex) => (
              <g key={key} {...a11y.getSeriesProps(seriesIndex)}>
                {data.map((datum, index) => {
                  const x = xScale(datum.x);
                  const offset = groupScale(key);
                  const y = yScale(getBarValue(datum, key));
                  const y0 = yScale(0);

                  if (x == null || offset == null || y == null || y0 == null) {
                    return null;
                  }

                  const barHeight = Math.abs(y0 - y);

                  return barHeight <= 0 ? null : (
                    <BarRounded
                      key={`${key}-${datum.x}-${index}`}
                      x={x + offset}
                      y={Math.min(y, y0)}
                      width={groupScale.bandwidth()}
                      height={barHeight}
                      radius={4}
                      top
                      fill={colorScale(key)}
                      data-grouped-bar-chart-bar=""
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

export function GroupedBarChart({
  data = defaultData,
  height = 320,
  keys = defaultKeys,
  width = 640,
  ...props
}: GroupedBarChartProps) {
  return (
    <ParentSize
      debounceTime={10}
      ignoreDimensions={['height', 'top', 'left']}
      initialSize={{ width, height }}
      style={{ width: '100%', height }}
    >
      {({ width: measuredWidth }) => (
        <GroupedBarChartSvg
          {...props}
          data={data}
          height={height}
          id={props.id}
          keys={keys}
          margin={props.margin ?? defaultMargin}
          showLegend={props.showLegend ?? true}
          showLiveRegion={props.showLiveRegion ?? true}
          title={props.title ?? 'Grouped bar chart'}
          width={getResponsiveWidth(measuredWidth, width)}
          xLabel={props.xLabel ?? 'Category'}
          yLabel={props.yLabel ?? 'Value'}
        />
      )}
    </ParentSize>
  );
}
