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
import { Threshold } from '@visx/threshold';
import { ThemeScope } from '@visx/theme';
import { useAxisStyle, useColor, useGridStyle } from '@visx/theme/react';
import { ChartLegend } from './chart-ui';

export type ThresholdChartDatum = {
  x: string;
  actual: number;
  target: number;
};

type ThresholdChartSeriesDatum = {
  x: string;
  y: number;
  series: 'actual' | 'target';
};

type NonEmptyThresholdChartSeriesData = [
  ThresholdChartSeriesDatum[],
  ...ThresholdChartSeriesDatum[][],
];

type NonEmptyThresholdChartSeriesConfig = [
  ChartA11ySeriesConfig<ThresholdChartSeriesDatum>,
  ...ChartA11ySeriesConfig<ThresholdChartSeriesDatum>[],
];

export type ThresholdChartMargin = MarginShape;

export type ThresholdChartProps = Omit<SVGProps<SVGSVGElement>, 'children' | 'height' | 'width'> & {
  data?: ThresholdChartDatum[];
  height?: number;
  margin?: ThresholdChartMargin;
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

type ThresholdChartSvgProps = Required<
  Pick<
    ThresholdChartProps,
    | 'data'
    | 'height'
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
    ThresholdChartProps,
    | 'data'
    | 'height'
    | 'margin'
    | 'showLegend'
    | 'showLiveRegion'
    | 'title'
    | 'width'
    | 'xLabel'
    | 'yLabel'
  >;

const defaultData: ThresholdChartDatum[] = [
  { x: 'Jan', actual: 42, target: 46 },
  { x: 'Feb', actual: 49, target: 48 },
  { x: 'Mar', actual: 53, target: 52 },
  { x: 'Apr', actual: 51, target: 56 },
  { x: 'May', actual: 62, target: 60 },
  { x: 'Jun', actual: 68, target: 64 },
  { x: 'Jul', actual: 66, target: 68 },
  { x: 'Aug', actual: 76, target: 72 },
];

const defaultMargin = {
  top: 24,
  right: 24,
  bottom: 52,
  left: 48,
};

function getYDomain(data: readonly ThresholdChartDatum[]): [number, number] {
  return getZeroBaselineDomain(data.flatMap((datum) => [datum.actual, datum.target]));
}

function formatY(value: number) {
  return new Intl.NumberFormat('en-US').format(value);
}

function ThresholdChartSvg({
  className,
  data,
  height,
  id,
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
}: ThresholdChartSvgProps) {
  const legendHeight = showLegend ? 28 : 0;
  const dimensions = useChartDimensions({
    width,
    height: Math.max(0, height - legendHeight),
    margin,
  });
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
  const seriesData = useMemo(
    () =>
      [
        data.map((datum) => ({ x: datum.x, y: datum.actual, series: 'actual' as const })),
        data.map((datum) => ({ x: datum.x, y: datum.target, series: 'target' as const })),
      ] as NonEmptyThresholdChartSeriesData,
    [data],
  );
  const a11ySeries = useMemo(
    () => [{ label: 'Actual' }, { label: 'Target' }] as NonEmptyThresholdChartSeriesConfig,
    [],
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
  const positiveColor = useColor(0);
  const negativeColor = useColor(4);
  const targetColor = useColor(2);
  const pointColor = useColor('background');
  const legendItems = useMemo(
    () => [
      { key: 'actual', label: 'Actual', color: positiveColor },
      { key: 'target', label: 'Target', color: targetColor },
    ],
    [positiveColor, targetColor],
  );
  const a11y = useChartA11y<ThresholdChartSeriesDatum>({
    id,
    title,
    chartType: 'area',
    data: seriesData,
    x: (datum) => datum.x,
    y: (datum) => datum.y,
    xLabel,
    yLabel,
    formatY,
    keyboardNavEnabled: data.length > 0,
    series: a11ySeries,
  });
  const thresholdId = `${a11y.id}-threshold`;

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
            {data.length > 1 && (
              <>
                <Threshold
                  id={thresholdId}
                  data={data}
                  x={(datum) => xScale(datum.x) ?? 0}
                  y0={(datum) => yScale(datum.target) ?? dimensions.innerHeight}
                  y1={(datum) => yScale(datum.actual) ?? dimensions.innerHeight}
                  clipAboveTo={0}
                  clipBelowTo={dimensions.innerHeight}
                  aboveAreaProps={{
                    fill: positiveColor,
                    fillOpacity: 0.22,
                  }}
                  belowAreaProps={{
                    fill: negativeColor,
                    fillOpacity: 0.18,
                  }}
                />
                <LinePath
                  data={data}
                  fill="none"
                  stroke={positiveColor}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  x={(datum) => xScale(datum.x) ?? 0}
                  y={(datum) => yScale(datum.actual) ?? dimensions.innerHeight}
                />
                <LinePath
                  data={data}
                  fill="none"
                  stroke={targetColor}
                  strokeDasharray="4 4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  x={(datum) => xScale(datum.x) ?? 0}
                  y={(datum) => yScale(datum.target) ?? dimensions.innerHeight}
                />
              </>
            )}
            {seriesData.map((series, seriesIndex) => {
              const stroke = seriesIndex === 0 ? positiveColor : targetColor;

              return (
                <g
                  key={seriesIndex === 0 ? 'actual' : 'target'}
                  {...a11y.getSeriesProps(seriesIndex)}
                >
                  {series.map((datum, index) => {
                    const cx = xScale(datum.x);
                    const cy = yScale(datum.y);

                    if (cx == null || cy == null || !Number.isFinite(datum.y)) {
                      return null;
                    }

                    return (
                      <circle
                        key={`${datum.series}-${datum.x}-${index}`}
                        cx={cx}
                        cy={cy}
                        r={3.5}
                        fill={pointColor}
                        stroke={stroke}
                        strokeWidth={2}
                        data-threshold-chart-point=""
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

export function ThresholdChart({
  data = defaultData,
  height = 320,
  width = 640,
  ...props
}: ThresholdChartProps) {
  return (
    <ParentSize
      debounceTime={10}
      ignoreDimensions={['height', 'top', 'left']}
      initialSize={{ width, height }}
      style={{ width: '100%', height }}
    >
      {({ width: measuredWidth }) => (
        <ThresholdChartSvg
          {...props}
          data={data}
          height={height}
          id={props.id}
          margin={props.margin ?? defaultMargin}
          showLegend={props.showLegend ?? true}
          showLiveRegion={props.showLiveRegion ?? true}
          title={props.title ?? 'Threshold chart'}
          width={getResponsiveWidth(measuredWidth, width)}
          xLabel={props.xLabel ?? 'Category'}
          yLabel={props.yLabel ?? 'Value'}
        />
      )}
    </ParentSize>
  );
}
