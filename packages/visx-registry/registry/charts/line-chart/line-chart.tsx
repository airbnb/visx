'use client';

import type { SVGProps } from 'react';
import { useMemo } from 'react';
import { useChartA11y } from '@visx/a11y/react';
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
import { useAxisStyle, useColor, useGridStyle } from '@visx/theme/react';

export type LineChartDatum = {
  x: string;
  y: number;
};

export type LineChartMargin = MarginShape;

export type LineChartProps = Omit<SVGProps<SVGSVGElement>, 'children' | 'height' | 'width'> & {
  data?: LineChartDatum[];
  height?: number;
  margin?: LineChartMargin;
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

type LineChartSvgProps = Required<
  Pick<
    LineChartProps,
    'data' | 'height' | 'margin' | 'showLiveRegion' | 'title' | 'width' | 'xLabel' | 'yLabel'
  >
> &
  Omit<
    LineChartProps,
    'data' | 'height' | 'margin' | 'showLiveRegion' | 'title' | 'width' | 'xLabel' | 'yLabel'
  >;

const defaultData: LineChartDatum[] = [
  { x: 'Jan', y: 32 },
  { x: 'Feb', y: 48 },
  { x: 'Mar', y: 41 },
  { x: 'Apr', y: 64 },
  { x: 'May', y: 58 },
  { x: 'Jun', y: 72 },
];

const defaultMargin = {
  top: 24,
  right: 24,
  bottom: 52,
  left: 48,
};

function getYDomain(data: readonly LineChartDatum[]): [number, number] {
  return getZeroBaselineDomain(data.map((datum) => datum.y));
}

function formatY(value: number) {
  return new Intl.NumberFormat('en-US').format(value);
}

function LineChartSvg({
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
  xTickFormat,
  xTickValues,
  yLabel,
  yMinTickSpacing = 48,
  yNumTicks,
  yTickFormat,
  yTickValues,
  ...svgProps
}: LineChartSvgProps) {
  const dimensions = useChartDimensions({ width, height, margin });
  const xDomain = useMemo(() => data.map((datum) => datum.x), [data]);
  const yDomain = useMemo(() => getYDomain(data), [data]);
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
  const lineColor = useColor(0);
  const pointColor = useColor('background');
  const a11y = useChartA11y<LineChartDatum>({
    id,
    title,
    chartType: 'line',
    data,
    x: (datum) => datum.x,
    y: (datum) => datum.y,
    xLabel,
    yLabel,
    formatY,
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
          <g {...a11y.getSeriesProps(0)}>
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
                  data-line-chart-point=""
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

export function LineChart({
  data = defaultData,
  height = 320,
  width = 640,
  ...props
}: LineChartProps) {
  return (
    <ParentSize
      debounceTime={10}
      ignoreDimensions={['height', 'top', 'left']}
      initialSize={{ width, height }}
      style={{ width: '100%', height }}
    >
      {({ width: measuredWidth }) => (
        <LineChartSvg
          {...props}
          data={data}
          height={height}
          id={props.id}
          margin={props.margin ?? defaultMargin}
          showLiveRegion={props.showLiveRegion ?? true}
          title={props.title ?? 'Line chart'}
          width={getResponsiveWidth(measuredWidth, width)}
          xLabel={props.xLabel ?? 'Category'}
          yLabel={props.yLabel ?? 'Value'}
        />
      )}
    </ParentSize>
  );
}
