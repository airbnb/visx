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
import { ThemeScope } from '@visx/theme';
import { useColor } from '@visx/theme/react';

export type RadarChartDatum = {
  x: string;
  y: number;
};

export type RadarChartMargin = MarginShape;

export type RadarChartProps = Omit<SVGProps<SVGSVGElement>, 'children' | 'height' | 'width'> & {
  data?: RadarChartDatum[];
  height?: number;
  levels?: number;
  margin?: RadarChartMargin;
  showLiveRegion?: boolean;
  title?: string;
  width?: number;
  xLabel?: string;
  yLabel?: string;
};

type RadarChartSvgProps = Required<
  Pick<
    RadarChartProps,
    | 'data'
    | 'height'
    | 'levels'
    | 'margin'
    | 'showLiveRegion'
    | 'title'
    | 'width'
    | 'xLabel'
    | 'yLabel'
  >
> &
  Omit<
    RadarChartProps,
    | 'data'
    | 'height'
    | 'levels'
    | 'margin'
    | 'showLiveRegion'
    | 'title'
    | 'width'
    | 'xLabel'
    | 'yLabel'
  >;

const defaultData: RadarChartDatum[] = [
  { x: 'Reliability', y: 92 },
  { x: 'Adoption', y: 76 },
  { x: 'Velocity', y: 84 },
  { x: 'Quality', y: 88 },
  { x: 'Coverage', y: 69 },
  { x: 'Efficiency', y: 81 },
];

const defaultMargin = {
  top: 28,
  right: 44,
  bottom: 28,
  left: 44,
};

function getValueDomain(data: readonly RadarChartDatum[]): [number, number] {
  return getPositiveDomain(data.map((datum) => datum.y));
}

function getAngle(index: number, length: number) {
  return (index / Math.max(1, length)) * Math.PI * 2;
}

function getPoint(angle: number, radius: number) {
  return {
    x: Math.sin(angle) * radius,
    y: -Math.cos(angle) * radius,
  };
}

function formatY(value: number) {
  return new Intl.NumberFormat('en-US').format(value);
}

function RadarChartSvg({
  className,
  data,
  height,
  id,
  levels,
  margin,
  showLiveRegion,
  style,
  title,
  width,
  xLabel,
  yLabel,
  ...svgProps
}: RadarChartSvgProps) {
  const dimensions = useChartDimensions({ width, height, margin });
  const radius = Math.max(0, Math.min(dimensions.innerWidth, dimensions.innerHeight) / 2);
  const centerX = dimensions.margin.left + dimensions.innerWidth / 2;
  const centerY = dimensions.margin.top + dimensions.innerHeight / 2;
  const valueDomain = useMemo(() => getValueDomain(data), [data]);
  const radiusScale = useScale({
    type: 'linear',
    domain: valueDomain,
    range: [0, radius],
    nice: true,
  });
  const polygonPoints = data
    .map((datum, index) => {
      const angle = getAngle(index, data.length);
      const point = getPoint(angle, radiusScale(Math.max(0, datum.y)) ?? 0);

      return `${point.x},${point.y}`;
    })
    .join(' ');
  const gridColor = useColor('border');
  const labelColor = useColor('textMuted');
  const fillColor = useColor(0);
  const pointColor = useColor('background');
  const a11y = useChartA11y<RadarChartDatum>({
    id,
    title,
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
        <g transform={`translate(${centerX} ${centerY})`}>
          {Array.from({ length: levels }, (_, index) => {
            const levelRadius = (radius * (index + 1)) / levels;
            const points = data
              .map((_datum, pointIndex) => {
                const point = getPoint(getAngle(pointIndex, data.length), levelRadius);

                return `${point.x},${point.y}`;
              })
              .join(' ');

            return (
              <polygon
                key={`level-${index}`}
                points={points}
                fill="none"
                stroke={gridColor}
                strokeWidth={1}
              />
            );
          })}
          {data.map((datum, index) => {
            const axisPoint = getPoint(getAngle(index, data.length), radius);
            const labelPoint = getPoint(getAngle(index, data.length), radius + 16);

            return (
              <g key={datum.x}>
                <line x1={0} x2={axisPoint.x} y1={0} y2={axisPoint.y} stroke={gridColor} />
                <text
                  x={labelPoint.x}
                  y={labelPoint.y}
                  dy="0.32em"
                  fill={labelColor}
                  fontSize={11}
                  textAnchor={
                    Math.abs(labelPoint.x) < 2 ? 'middle' : labelPoint.x > 0 ? 'start' : 'end'
                  }
                >
                  {datum.x}
                </text>
              </g>
            );
          })}
          <g {...a11y.getSeriesProps(0)}>
            {data.length > 0 && (
              <polygon
                points={polygonPoints}
                fill={fillColor}
                fillOpacity={0.2}
                stroke={fillColor}
                strokeWidth={2}
                data-radar-chart-area=""
              />
            )}
            {data.map((datum, index) => {
              const angle = getAngle(index, data.length);
              const point = getPoint(angle, radiusScale(Math.max(0, datum.y)) ?? 0);

              return (
                <circle
                  key={`${datum.x}-${index}`}
                  cx={point.x}
                  cy={point.y}
                  r={4}
                  fill={pointColor}
                  stroke={fillColor}
                  strokeWidth={2}
                  data-radar-chart-point=""
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

export function RadarChart({
  data = defaultData,
  height = 360,
  levels = 4,
  width = 640,
  ...props
}: RadarChartProps) {
  return (
    <ParentSize
      debounceTime={10}
      ignoreDimensions={['height', 'top', 'left']}
      initialSize={{ width, height }}
      style={{ width: '100%', height }}
    >
      {({ width: measuredWidth }) => (
        <RadarChartSvg
          {...props}
          data={data}
          height={height}
          id={props.id}
          levels={levels}
          margin={props.margin ?? defaultMargin}
          showLiveRegion={props.showLiveRegion ?? true}
          title={props.title ?? 'Radar chart'}
          width={getResponsiveWidth(measuredWidth, width)}
          xLabel={props.xLabel ?? 'Metric'}
          yLabel={props.yLabel ?? 'Score'}
        />
      )}
    </ParentSize>
  );
}
