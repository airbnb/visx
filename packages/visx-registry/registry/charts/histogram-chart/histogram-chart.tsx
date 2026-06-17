'use client';

import type { SVGProps } from 'react';
import { useMemo } from 'react';
import { useChartA11y } from '@visx/a11y/react';
import { AxisBottom, AxisLeft } from '@visx/axis';
import {
  getAxisTickCount,
  getPositiveDomain,
  getResponsiveWidth,
  getVisibleTickValues,
  isFiniteNumber,
  type AxisTickFormatter,
  type MarginShape,
  useChartDimensions,
} from '@visx/chart';
import { GridRows } from '@visx/grid';
import { ParentSize } from '@visx/responsive';
import { useScale } from '@visx/scale/react';
import { BarRounded } from '@visx/shape';
import { ThemeScope } from '@visx/theme';
import { useAxisStyle, useColor, useGridStyle } from '@visx/theme/react';

export type HistogramBinDatum = {
  x: string;
  x0: number;
  x1: number;
  y: number;
};

export type HistogramChartMargin = MarginShape;

export type HistogramChartProps = Omit<
  SVGProps<SVGSVGElement>,
  'children' | 'height' | 'values' | 'width'
> & {
  binCount?: number;
  height?: number;
  margin?: HistogramChartMargin;
  showLiveRegion?: boolean;
  title?: string;
  values?: number[];
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

type HistogramChartSvgProps = Required<
  Pick<
    HistogramChartProps,
    | 'binCount'
    | 'height'
    | 'margin'
    | 'showLiveRegion'
    | 'title'
    | 'values'
    | 'width'
    | 'xLabel'
    | 'yLabel'
  >
> &
  Omit<
    HistogramChartProps,
    | 'binCount'
    | 'height'
    | 'margin'
    | 'showLiveRegion'
    | 'title'
    | 'values'
    | 'width'
    | 'xLabel'
    | 'yLabel'
  >;

const defaultValues = [
  18, 22, 24, 28, 31, 34, 36, 38, 41, 42, 46, 48, 49, 52, 55, 58, 61, 63, 68, 72, 76,
];

const defaultMargin = {
  top: 24,
  right: 24,
  bottom: 52,
  left: 48,
};

function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(value);
}

function getBinLabel(x0: number, x1: number) {
  return `${formatNumber(x0)}-${formatNumber(x1)}`;
}

function getBins(values: readonly number[], requestedBinCount: number): HistogramBinDatum[] {
  const finiteValues = values.filter(isFiniteNumber);

  if (finiteValues.length === 0) {
    return [];
  }

  const binCount = Math.max(1, Math.floor(requestedBinCount));
  const min = Math.min(...finiteValues);
  const max = Math.max(...finiteValues);

  if (min === max) {
    return [{ x: formatNumber(min), x0: min, x1: max, y: finiteValues.length }];
  }

  const step = (max - min) / binCount;
  const bins = Array.from({ length: binCount }, (_, index) => {
    const x0 = min + step * index;
    const x1 = index === binCount - 1 ? max : x0 + step;

    return { x: getBinLabel(x0, x1), x0, x1, y: 0 };
  });

  finiteValues.forEach((value) => {
    const index = Math.min(binCount - 1, Math.floor((value - min) / step));

    bins[index].y += 1;
  });

  return bins;
}

function getYDomain(data: readonly HistogramBinDatum[]): [number, number] {
  return getPositiveDomain(data.map((datum) => datum.y));
}

function HistogramChartSvg({
  binCount,
  className,
  height,
  id,
  margin,
  showLiveRegion,
  style,
  title,
  values,
  width,
  xLabel,
  xMinTickSpacing = 56,
  xTickFormat,
  xTickValues,
  yLabel,
  yMinTickSpacing = 48,
  yNumTicks,
  yTickFormat,
  yTickValues,
  ...svgProps
}: HistogramChartSvgProps) {
  const dimensions = useChartDimensions({ width, height, margin });
  const bins = useMemo(() => getBins(values, binCount), [values, binCount]);
  const xDomain = useMemo(() => bins.map((datum) => datum.x), [bins]);
  const yDomain = useMemo(() => getYDomain(bins), [bins]);
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
  const xScale = useScale({
    type: 'band',
    domain: xDomain,
    range: [0, dimensions.innerWidth],
    padding: 0.18,
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
  const barColor = useColor(0);
  const a11y = useChartA11y<HistogramBinDatum>({
    id,
    title,
    chartType: 'histogram',
    data: bins,
    x: (datum) => datum.x,
    y: (datum) => datum.y,
    xLabel,
    yLabel,
    formatY: (value) => new Intl.NumberFormat('en-US').format(value),
    keyboardNavEnabled: bins.length > 0,
    series: [{ label: title }],
  });

  return (
    <ThemeScope as={false}>
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
          <g {...a11y.getSeriesProps(0)}>
            {bins.map((datum, index) => {
              const x = xScale(datum.x);
              const y = yScale(datum.y);
              const y0 = yScale(0);

              if (x == null || y == null || y0 == null) {
                return null;
              }

              return Math.abs(y0 - y) <= 0 ? null : (
                <BarRounded
                  key={`${datum.x}-${index}`}
                  x={x}
                  y={Math.min(y, y0)}
                  width={xScale.bandwidth()}
                  height={Math.abs(y0 - y)}
                  radius={3}
                  top
                  fill={barColor}
                  data-histogram-chart-bin=""
                  {...a11y.getPointProps(0, index)}
                />
              );
            })}
          </g>
        </g>
      </svg>
      <a11y.DataTable />
      {showLiveRegion && <a11y.Announcer />}
    </ThemeScope>
  );
}

export function HistogramChart({
  binCount = 6,
  height = 320,
  values = defaultValues,
  width = 640,
  ...props
}: HistogramChartProps) {
  return (
    <ParentSize
      debounceTime={10}
      ignoreDimensions={['height', 'top', 'left']}
      initialSize={{ width, height }}
      style={{ width: '100%', height }}
    >
      {({ width: measuredWidth }) => (
        <HistogramChartSvg
          {...props}
          binCount={binCount}
          height={height}
          id={props.id}
          margin={props.margin ?? defaultMargin}
          showLiveRegion={props.showLiveRegion ?? true}
          title={props.title ?? 'Histogram Chart'}
          values={values}
          width={getResponsiveWidth(measuredWidth, width)}
          xLabel={props.xLabel ?? 'Range'}
          yLabel={props.yLabel ?? 'Count'}
        />
      )}
    </ParentSize>
  );
}
