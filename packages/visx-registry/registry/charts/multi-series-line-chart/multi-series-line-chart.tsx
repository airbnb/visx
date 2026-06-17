'use client';

import type { SVGProps } from 'react';
import { useMemo } from 'react';
import { useChartA11y, type ChartA11ySeriesConfig } from '@visx/a11y/react';
import { AxisBottom, AxisLeft } from '@visx/axis';
import {
  getAxisTickCount,
  getResponsiveWidth,
  getVisibleTickValues,
  getZeroBaselineDomain,
  type AxisTickFormatter,
  type MarginShape,
  useChartDimensions,
} from '@visx/chart';
import { GridRows } from '@visx/grid';
import { ParentSize } from '@visx/responsive';
import { useScale } from '@visx/scale/react';
import { LinePath } from '@visx/shape';
import { ThemeScope } from '@visx/theme';
import { useAxisStyle, useColor, useColorScale, useGridStyle } from '@visx/theme/react';
import { ChartLegend } from './chart-ui';

export type MultiSeriesLineChartDatum = {
  x: string;
  y: number;
};

export type MultiSeriesLineChartSeries = {
  label: string;
  data: MultiSeriesLineChartDatum[];
};

type NonEmptyMultiSeriesLineChartData = [
  MultiSeriesLineChartDatum[],
  ...MultiSeriesLineChartDatum[][],
];

type NonEmptyMultiSeriesLineChartSeriesConfig = [
  ChartA11ySeriesConfig<MultiSeriesLineChartDatum>,
  ...ChartA11ySeriesConfig<MultiSeriesLineChartDatum>[],
];

export type MultiSeriesLineChartMargin = MarginShape;

export type MultiSeriesLineChartProps = Omit<
  SVGProps<SVGSVGElement>,
  'children' | 'height' | 'width'
> & {
  height?: number;
  margin?: MultiSeriesLineChartMargin;
  series?: MultiSeriesLineChartSeries[];
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

type MultiSeriesLineChartSvgProps = Required<
  Pick<
    MultiSeriesLineChartProps,
    | 'height'
    | 'margin'
    | 'series'
    | 'showLegend'
    | 'showLiveRegion'
    | 'title'
    | 'width'
    | 'xLabel'
    | 'yLabel'
  >
> &
  Omit<
    MultiSeriesLineChartProps,
    | 'height'
    | 'margin'
    | 'series'
    | 'showLegend'
    | 'showLiveRegion'
    | 'title'
    | 'width'
    | 'xLabel'
    | 'yLabel'
  >;

const defaultSeries: MultiSeriesLineChartSeries[] = [
  {
    label: 'Desktop',
    data: [
      { x: 'Jan', y: 32 },
      { x: 'Feb', y: 48 },
      { x: 'Mar', y: 41 },
      { x: 'Apr', y: 64 },
      { x: 'May', y: 58 },
      { x: 'Jun', y: 72 },
    ],
  },
  {
    label: 'Mobile',
    data: [
      { x: 'Jan', y: 22 },
      { x: 'Feb', y: 28 },
      { x: 'Mar', y: 36 },
      { x: 'Apr', y: 46 },
      { x: 'May', y: 52 },
      { x: 'Jun', y: 61 },
    ],
  },
];

const defaultMargin = {
  top: 24,
  right: 24,
  bottom: 52,
  left: 48,
};

function getYDomain(series: readonly MultiSeriesLineChartSeries[]): [number, number] {
  return getZeroBaselineDomain(series.flatMap(({ data }) => data.map((datum) => datum.y)));
}

function getXDomain(series: readonly MultiSeriesLineChartSeries[]) {
  const seen = new Set<string>();

  series.forEach(({ data }) => {
    data.forEach((datum) => {
      seen.add(datum.x);
    });
  });

  return Array.from(seen);
}

function formatY(value: number) {
  return new Intl.NumberFormat('en-US').format(value);
}

function MultiSeriesLineChartSvg({
  className,
  height,
  id,
  margin,
  series,
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
}: MultiSeriesLineChartSvgProps) {
  const legendHeight = showLegend ? 28 : 0;
  const dimensions = useChartDimensions({
    width,
    height: Math.max(0, height - legendHeight),
    margin,
  });
  const xDomain = useMemo(() => getXDomain(series), [series]);
  const yDomain = useMemo(() => getYDomain(series), [series]);
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
  const a11yData = useMemo(
    () =>
      series.length > 0 ? (series.map(({ data }) => data) as NonEmptyMultiSeriesLineChartData) : [],
    [series],
  );
  const a11ySeries = useMemo(
    () =>
      (series.length > 0
        ? series.map(({ label }) => ({ label }))
        : [{ label: title }]) as NonEmptyMultiSeriesLineChartSeriesConfig,
    [series, title],
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
  const colorScale = useColorScale(series.map(({ label }) => label));
  const legendItems = useMemo(
    () =>
      series.map(({ label }) => ({
        key: label,
        label,
        color: colorScale(label),
      })),
    [colorScale, series],
  );
  const a11y = useChartA11y<MultiSeriesLineChartDatum>({
    id,
    title,
    chartType: 'line',
    data: a11yData,
    x: (datum) => datum.x,
    y: (datum) => datum.y,
    xLabel,
    yLabel,
    formatY,
    keyboardNavEnabled: series.some(({ data }) => data.length > 0),
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
            {series.map(({ data, label }, seriesIndex) => {
              const lineColor = colorScale(label);

              return (
                <g key={label} {...a11y.getSeriesProps(seriesIndex)}>
                  {data.length > 1 && (
                    <LinePath
                      data={data}
                      defined={(datum) => Number.isFinite(datum.y) && xScale(datum.x) != null}
                      fill="none"
                      stroke={lineColor}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      x={(datum) => xScale(datum.x) ?? 0}
                      y={(datum) => yScale(datum.y) ?? dimensions.innerHeight}
                    />
                  )}
                  {data.map((datum, index) => {
                    const cx = xScale(datum.x);
                    const cy = yScale(datum.y);

                    if (cx == null || cy == null || !Number.isFinite(datum.y)) {
                      return null;
                    }

                    return (
                      <circle
                        key={`${datum.x}-${index}`}
                        cx={cx}
                        cy={cy}
                        r={4}
                        fill={pointColor}
                        stroke={lineColor}
                        strokeWidth={2}
                        data-multi-series-line-chart-point=""
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

export function MultiSeriesLineChart({
  height = 320,
  series = defaultSeries,
  width = 640,
  ...props
}: MultiSeriesLineChartProps) {
  return (
    <ParentSize
      debounceTime={10}
      ignoreDimensions={['height', 'top', 'left']}
      initialSize={{ width, height }}
      style={{ width: '100%', height }}
    >
      {({ width: measuredWidth }) => (
        <MultiSeriesLineChartSvg
          {...props}
          height={height}
          id={props.id}
          margin={props.margin ?? defaultMargin}
          series={series}
          showLegend={props.showLegend ?? true}
          showLiveRegion={props.showLiveRegion ?? true}
          title={props.title ?? 'Multi-series line chart'}
          width={getResponsiveWidth(measuredWidth, width)}
          xLabel={props.xLabel ?? 'Category'}
          yLabel={props.yLabel ?? 'Value'}
        />
      )}
    </ParentSize>
  );
}
