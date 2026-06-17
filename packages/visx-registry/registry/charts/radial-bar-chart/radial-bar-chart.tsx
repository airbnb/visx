'use client';

import type { SVGProps } from 'react';
import { useMemo } from 'react';
import { useChartA11y } from '@visx/a11y/react';
import {
  getPositiveDomain,
  getResponsiveWidth,
  type MarginShape,
  useChartDimensions,
} from '@visx/chart';
import { ParentSize } from '@visx/responsive';
import { useScale } from '@visx/scale/react';
import { Arc } from '@visx/shape';
import { ThemeScope } from '@visx/theme';
import { useColor, useColorScale } from '@visx/theme/react';

export type RadialBarChartDatum = {
  x: string;
  y: number;
};

export type RadialBarChartMargin = MarginShape;

export type RadialBarChartProps = Omit<SVGProps<SVGSVGElement>, 'children' | 'height' | 'width'> & {
  data?: RadialBarChartDatum[];
  height?: number;
  margin?: RadialBarChartMargin;
  showLiveRegion?: boolean;
  title?: string;
  width?: number;
  xLabel?: string;
  yLabel?: string;
};

type RadialBarChartSvgProps = Required<
  Pick<
    RadialBarChartProps,
    'data' | 'height' | 'margin' | 'showLiveRegion' | 'title' | 'width' | 'xLabel' | 'yLabel'
  >
> &
  Omit<
    RadialBarChartProps,
    'data' | 'height' | 'margin' | 'showLiveRegion' | 'title' | 'width' | 'xLabel' | 'yLabel'
  >;

const defaultData: RadialBarChartDatum[] = [
  { x: 'North', y: 72 },
  { x: 'South', y: 58 },
  { x: 'East', y: 84 },
  { x: 'West', y: 64 },
  { x: 'Central', y: 76 },
];

const defaultMargin = {
  top: 24,
  right: 24,
  bottom: 24,
  left: 24,
};

function getValueDomain(data: readonly RadialBarChartDatum[]): [number, number] {
  return getPositiveDomain(data.map((datum) => datum.y));
}

function formatY(value: number) {
  return new Intl.NumberFormat('en-US').format(value);
}

function RadialBarChartSvg({
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
  yLabel,
  ...svgProps
}: RadialBarChartSvgProps) {
  const dimensions = useChartDimensions({ width, height, margin });
  const radius = Math.max(0, Math.min(dimensions.innerWidth, dimensions.innerHeight) / 2);
  const centerX = dimensions.margin.left + dimensions.innerWidth / 2;
  const centerY = dimensions.margin.top + dimensions.innerHeight / 2;
  const valueDomain = useMemo(() => getValueDomain(data), [data]);
  const radiusScale = useScale({
    type: 'linear',
    domain: valueDomain,
    range: [radius * 0.34, radius],
    nice: true,
  });
  const colorScale = useColorScale(data.map((datum) => datum.x));
  const labelColor = useColor('textMuted');
  const a11y = useChartA11y<RadialBarChartDatum>({
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
    series: [{ label: title }],
  });
  const angleStep = (Math.PI * 2) / Math.max(1, data.length);
  const padAngle = Math.min(0.04, angleStep * 0.16);
  const innerRadius = radius * 0.28;

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
        <g transform={`translate(${centerX} ${centerY})`} {...a11y.getSeriesProps(0)}>
          {data.map((datum, index) => {
            const startAngle = index * angleStep + padAngle;
            const endAngle = (index + 1) * angleStep - padAngle;
            const outerRadius = radiusScale(Math.max(0, datum.y)) ?? innerRadius;
            const labelAngle = startAngle + (endAngle - startAngle) / 2;
            const labelRadius = radius + 14;
            const labelX = Math.sin(labelAngle) * labelRadius;
            const labelY = -Math.cos(labelAngle) * labelRadius;

            return (
              <g key={`${datum.x}-${index}`}>
                <Arc
                  startAngle={startAngle}
                  endAngle={endAngle}
                  innerRadius={innerRadius}
                  outerRadius={outerRadius}
                  cornerRadius={4}
                  fill={colorScale(datum.x)}
                  data-radial-bar-chart-bar=""
                  {...a11y.getPointProps(0, index)}
                />
                <text
                  x={labelX}
                  y={labelY}
                  dy="0.32em"
                  fill={labelColor}
                  fontSize={11}
                  textAnchor={Math.abs(labelX) < 2 ? 'middle' : labelX > 0 ? 'start' : 'end'}
                >
                  {datum.x}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
      <a11y.DataTable />
      {showLiveRegion && <a11y.Announcer />}
    </ThemeScope>
  );
}

export function RadialBarChart({
  data = defaultData,
  height = 360,
  width = 640,
  ...props
}: RadialBarChartProps) {
  return (
    <ParentSize
      debounceTime={10}
      ignoreDimensions={['height', 'top', 'left']}
      initialSize={{ width, height }}
      style={{ width: '100%', height }}
    >
      {({ width: measuredWidth }) => (
        <RadialBarChartSvg
          {...props}
          data={data}
          height={height}
          id={props.id}
          margin={props.margin ?? defaultMargin}
          showLiveRegion={props.showLiveRegion ?? true}
          title={props.title ?? 'Radial bar chart'}
          width={getResponsiveWidth(measuredWidth, width)}
          xLabel={props.xLabel ?? 'Category'}
          yLabel={props.yLabel ?? 'Value'}
        />
      )}
    </ParentSize>
  );
}
