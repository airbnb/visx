'use client';

import type { SVGProps } from 'react';
import { useMemo } from 'react';
import { useChartA11y } from '@visx/a11y/react';
import { AxisBottom, AxisLeft } from '@visx/axis';
import {
  getAxisTickCount,
  getPaddedDomain,
  getResponsiveWidth,
  type AxisTickFormatter,
  type MarginShape,
  useChartDimensions,
} from '@visx/chart';
import { GridRows } from '@visx/grid';
import { ParentSize } from '@visx/responsive';
import { useScale } from '@visx/scale/react';
import { Circle } from '@visx/shape';
import { ThemeScope } from '@visx/theme';
import { useAxisStyle, useColor, useGridStyle } from '@visx/theme/react';

export type ScatterChartDatum = {
  x: number;
  y: number;
  label?: string;
};

export type ScatterChartMargin = MarginShape;

export type ScatterChartProps = Omit<SVGProps<SVGSVGElement>, 'children' | 'height' | 'width'> & {
  data?: ScatterChartDatum[];
  height?: number;
  margin?: ScatterChartMargin;
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
  yNumTicks?: number;
  yTickFormat?: AxisTickFormatter<number>;
  yTickValues?: number[];
};

type ScatterChartSvgProps = Required<
  Pick<
    ScatterChartProps,
    'data' | 'height' | 'margin' | 'showLiveRegion' | 'title' | 'width' | 'xLabel' | 'yLabel'
  >
> &
  Omit<
    ScatterChartProps,
    'data' | 'height' | 'margin' | 'showLiveRegion' | 'title' | 'width' | 'xLabel' | 'yLabel'
  >;

const defaultData: ScatterChartDatum[] = [
  { x: 14, y: 38, label: 'Segment A' },
  { x: 24, y: 46, label: 'Segment B' },
  { x: 34, y: 42, label: 'Segment C' },
  { x: 46, y: 58, label: 'Segment D' },
  { x: 58, y: 63, label: 'Segment E' },
  { x: 72, y: 76, label: 'Segment F' },
];

const defaultMargin = {
  top: 24,
  right: 24,
  bottom: 52,
  left: 48,
};

function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US').format(value);
}

function ScatterChartSvg({
  className,
  data,
  height,
  id,
  margin,
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
  yMinTickSpacing = 48,
  yNumTicks,
  yTickFormat,
  yTickValues,
  ...svgProps
}: ScatterChartSvgProps) {
  const dimensions = useChartDimensions({ width, height, margin });
  const xDomain = useMemo(() => getPaddedDomain(data.map((datum) => datum.x)), [data]);
  const yDomain = useMemo(() => getPaddedDomain(data.map((datum) => datum.y)), [data]);
  const visibleXNumTicks =
    xTickValues == null
      ? xNumTicks ??
        getAxisTickCount({
          axisLength: dimensions.innerWidth,
          maxTicks: 5,
          minTickSpacing: xMinTickSpacing,
        })
      : undefined;
  const visibleYNumTicks =
    yTickValues == null
      ? yNumTicks ??
        getAxisTickCount({
          axisLength: dimensions.innerHeight,
          maxTicks: 5,
          minTickSpacing: yMinTickSpacing,
        })
      : undefined;
  const formatXTick = xTickFormat ?? ((value: number) => formatNumber(value));
  const formatYTick = yTickFormat ?? ((value: number) => formatNumber(value));
  const xScale = useScale({
    type: 'linear',
    domain: xDomain,
    range: [0, dimensions.innerWidth],
    nice: true,
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
  const pointColor = useColor(0);
  const a11y = useChartA11y<ScatterChartDatum>({
    id,
    title,
    chartType: 'scatter',
    data,
    x: (datum) => datum.x,
    y: (datum) => datum.y,
    xLabel,
    yLabel,
    formatY: formatNumber,
    keyboardNavEnabled: data.length > 0,
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
            tickFormat={(value, index) => formatYTick(Number(value), index)}
            tickLabelProps={yAxisStyle.tickLabelProps}
            tickLength={yAxisStyle.tickLength}
            tickStroke={yAxisStyle.tickStroke}
            tickValues={yTickValues}
          />
          <AxisBottom
            label={xLabel}
            labelOffset={xAxisStyle.labelOffset}
            labelProps={xAxisStyle.labelProps}
            numTicks={visibleXNumTicks}
            scale={xScale}
            stroke={xAxisStyle.stroke}
            strokeWidth={xAxisStyle.strokeWidth}
            tickFormat={(value, index) => formatXTick(Number(value), index)}
            tickLabelProps={xAxisStyle.tickLabelProps}
            tickLength={xAxisStyle.tickLength}
            tickStroke={xAxisStyle.tickStroke}
            tickValues={xTickValues}
            top={dimensions.innerHeight}
          />
          <g {...a11y.getSeriesProps(0)}>
            {data.map((datum, index) => {
              const cx = xScale(datum.x);
              const cy = yScale(datum.y);

              if (
                cx == null ||
                cy == null ||
                !Number.isFinite(datum.x) ||
                !Number.isFinite(datum.y)
              ) {
                return null;
              }

              return (
                <Circle
                  key={`${datum.label ?? 'point'}-${index}`}
                  cx={cx}
                  cy={cy}
                  r={5}
                  fill={pointColor}
                  fillOpacity={0.84}
                  stroke={pointColor}
                  strokeWidth={1.5}
                  data-scatter-chart-point=""
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

export function ScatterChart({
  data = defaultData,
  height = 320,
  width = 640,
  ...props
}: ScatterChartProps) {
  return (
    <ParentSize
      debounceTime={10}
      ignoreDimensions={['height', 'top', 'left']}
      initialSize={{ width, height }}
      style={{ width: '100%', height }}
    >
      {({ width: measuredWidth }) => (
        <ScatterChartSvg
          {...props}
          data={data}
          height={height}
          id={props.id}
          margin={props.margin ?? defaultMargin}
          showLiveRegion={props.showLiveRegion ?? true}
          title={props.title ?? 'Scatter chart'}
          width={getResponsiveWidth(measuredWidth, width)}
          xLabel={props.xLabel ?? 'X value'}
          yLabel={props.yLabel ?? 'Y value'}
        />
      )}
    </ParentSize>
  );
}
