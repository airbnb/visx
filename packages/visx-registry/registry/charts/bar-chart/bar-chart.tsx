'use client';

import type { SVGProps } from 'react';
import { useMemo, useState } from 'react';
import { useChartA11y } from '@visx/a11y/react';
import { AxisBottom, AxisLeft } from '@visx/axis';
import {
  getAxisTickCount,
  getChartConfigColor,
  getChartConfigIcon,
  getChartConfigLabel,
  getResponsiveWidth,
  getVisibleTickValues,
  getZeroBaselineDomain,
  type AxisTickFormatter,
  type ChartConfig,
  type MarginShape,
  useChartDimensions,
} from '@visx/chart';
import { GridRows } from '@visx/grid';
import { ParentSize } from '@visx/responsive';
import { useScale } from '@visx/scale/react';
import { BarRounded } from '@visx/shape';
import { ThemeScope } from '@visx/theme';
import { useAxisStyle, useColor, useGridStyle } from '@visx/theme/react';
import { ChartLegend, ChartTooltip } from './chart-ui';

export type BarChartDatum = {
  x: string;
  y: number;
};

export type BarChartMargin = MarginShape;

export type BarChartProps = Omit<SVGProps<SVGSVGElement>, 'children' | 'height' | 'width'> & {
  config?: ChartConfig;
  data?: BarChartDatum[];
  formatValue?: (value: number, datum: BarChartDatum) => string;
  height?: number;
  margin?: BarChartMargin;
  seriesKey?: string;
  showLegend?: boolean;
  showLiveRegion?: boolean;
  showTooltip?: boolean;
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

type BarChartSvgProps = Required<
  Pick<
    BarChartProps,
    | 'data'
    | 'height'
    | 'margin'
    | 'seriesKey'
    | 'showLegend'
    | 'showLiveRegion'
    | 'showTooltip'
    | 'title'
    | 'width'
    | 'xLabel'
    | 'yLabel'
  >
> &
  Pick<BarChartProps, 'config' | 'formatValue'> &
  Omit<
    BarChartProps,
    | 'config'
    | 'data'
    | 'formatValue'
    | 'height'
    | 'margin'
    | 'seriesKey'
    | 'showLegend'
    | 'showLiveRegion'
    | 'showTooltip'
    | 'title'
    | 'width'
    | 'xLabel'
    | 'yLabel'
  >;

type BarChartTooltipState = {
  index: number;
  x: number;
  y: number;
};

const defaultData: BarChartDatum[] = [
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

function getYDomain(data: readonly BarChartDatum[]): [number, number] {
  return getZeroBaselineDomain(data.map((datum) => datum.y));
}

function formatY(value: number) {
  return new Intl.NumberFormat('en-US').format(value);
}

function BarChartSvg({
  className,
  config,
  data,
  formatValue,
  height,
  id,
  margin,
  seriesKey,
  showLegend,
  showLiveRegion,
  showTooltip,
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
}: BarChartSvgProps) {
  const [tooltip, setTooltip] = useState<BarChartTooltipState | null>(null);
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
  const barColor = useColor(0);
  const seriesColor = getChartConfigColor(config, seriesKey, barColor);
  const seriesLabel = getChartConfigLabel(config, seriesKey, yLabel);
  const seriesIcon = getChartConfigIcon(config, seriesKey);
  const a11y = useChartA11y<BarChartDatum>({
    id,
    title,
    chartType: 'bar',
    data,
    x: (datum) => datum.x,
    y: (datum) => datum.y,
    xLabel,
    yLabel,
    formatY,
    keyboardNavEnabled: data.length > 0,
    series: [{ label: seriesLabel }],
  });
  const activeDatum = tooltip == null ? null : data[tooltip.index];

  return (
    <ThemeScope as={false}>
      <div style={{ position: 'relative', width: '100%', height }}>
        {showLegend && (
          <ChartLegend
            config={config}
            items={[{ key: seriesKey, label: seriesLabel, color: seriesColor, icon: seriesIcon }]}
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
            <g {...a11y.getSeriesProps(0)}>
              {data.map((datum, index) => {
                const x = xScale(datum.x);
                const y = yScale(datum.y);
                const y0 = yScale(0);

                if (x == null || y == null || y0 == null || !Number.isFinite(datum.y)) {
                  return null;
                }

                if (Math.abs(y0 - y) <= 0) {
                  return null;
                }

                const pointProps = a11y.getPointProps(0, index);
                const { onFocus, ...barA11yProps } = pointProps;
                const showDatumTooltip = () => {
                  setTooltip({
                    index,
                    x: dimensions.margin.left + x + xScale.bandwidth() / 2,
                    y: legendHeight + dimensions.margin.top + Math.min(y, y0),
                  });
                };

                return (
                  <BarRounded
                    key={`${datum.x}-${index}`}
                    x={x}
                    y={Math.min(y, y0)}
                    width={xScale.bandwidth()}
                    height={Math.abs(y0 - y)}
                    radius={4}
                    top
                    fill={seriesColor}
                    data-bar-chart-bar=""
                    {...barA11yProps}
                    onBlur={() => setTooltip(null)}
                    onFocus={() => {
                      onFocus?.();
                      showDatumTooltip();
                    }}
                    onPointerEnter={showDatumTooltip}
                    onPointerLeave={() => setTooltip(null)}
                    onPointerMove={showDatumTooltip}
                  />
                );
              })}
            </g>
          </g>
        </svg>
        {showTooltip && activeDatum && (
          <ChartTooltip
            active
            bounds={{
              width: dimensions.width,
              height,
            }}
            config={config}
            items={[
              {
                key: seriesKey,
                label: seriesLabel,
                color: seriesColor,
                icon: seriesIcon,
                value: formatValue
                  ? formatValue(activeDatum.y, activeDatum)
                  : formatY(activeDatum.y),
              },
            ]}
            label={activeDatum.x}
            x={tooltip?.x}
            y={tooltip?.y}
          />
        )}
      </div>
      <a11y.DataTable />
      {showLiveRegion && <a11y.Announcer />}
    </ThemeScope>
  );
}

export function BarChart({
  data = defaultData,
  height = 320,
  width = 640,
  ...props
}: BarChartProps) {
  return (
    <ParentSize
      debounceTime={10}
      ignoreDimensions={['height', 'top', 'left']}
      initialSize={{ width, height }}
      style={{ width: '100%', height }}
    >
      {({ width: measuredWidth }) => (
        <BarChartSvg
          {...props}
          data={data}
          height={height}
          id={props.id}
          margin={props.margin ?? defaultMargin}
          seriesKey={props.seriesKey ?? 'value'}
          showLegend={props.showLegend ?? false}
          showLiveRegion={props.showLiveRegion ?? true}
          showTooltip={props.showTooltip ?? true}
          title={props.title ?? 'Bar chart'}
          width={getResponsiveWidth(measuredWidth, width)}
          xLabel={props.xLabel ?? 'Category'}
          yLabel={props.yLabel ?? 'Value'}
        />
      )}
    </ParentSize>
  );
}
