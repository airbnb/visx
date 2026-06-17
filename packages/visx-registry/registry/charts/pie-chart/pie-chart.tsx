'use client';

import type { SVGProps } from 'react';
import { useMemo } from 'react';
import { useChartA11y } from '@visx/a11y/react';
import { getResponsiveWidth, type MarginShape, useChartDimensions } from '@visx/chart';
import { ParentSize } from '@visx/responsive';
import { Pie } from '@visx/shape';
import { ThemeScope } from '@visx/theme';
import { useColorScale } from '@visx/theme/react';

export type PieChartDatum = {
  label: string;
  value: number;
};

export type PieChartMargin = MarginShape;

export type PieChartProps = Omit<SVGProps<SVGSVGElement>, 'children' | 'height' | 'width'> & {
  data?: PieChartDatum[];
  height?: number;
  margin?: PieChartMargin;
  showLiveRegion?: boolean;
  title?: string;
  width?: number;
  xLabel?: string;
  yLabel?: string;
};

type PieChartSvgProps = Required<
  Pick<
    PieChartProps,
    'data' | 'height' | 'margin' | 'showLiveRegion' | 'title' | 'width' | 'xLabel' | 'yLabel'
  >
> &
  Omit<
    PieChartProps,
    'data' | 'height' | 'margin' | 'showLiveRegion' | 'title' | 'width' | 'xLabel' | 'yLabel'
  >;

const defaultData: PieChartDatum[] = [
  { label: 'Organic', value: 42 },
  { label: 'Paid', value: 28 },
  { label: 'Referral', value: 18 },
  { label: 'Direct', value: 12 },
];

const defaultMargin = {
  top: 18,
  right: 18,
  bottom: 18,
  left: 18,
};

function formatY(value: number) {
  return new Intl.NumberFormat('en-US').format(value);
}

function PieChartSvg({
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
}: PieChartSvgProps) {
  const dimensions = useChartDimensions({ width, height, margin });
  const filteredData = useMemo(
    () => data.filter((datum) => Number.isFinite(datum.value) && datum.value >= 0),
    [data],
  );
  const radius = Math.max(0, Math.min(dimensions.innerWidth, dimensions.innerHeight) / 2);
  const centerX = dimensions.margin.left + dimensions.innerWidth / 2;
  const centerY = dimensions.margin.top + dimensions.innerHeight / 2;
  const colorScale = useColorScale(data.map((datum) => datum.label));
  const a11y = useChartA11y<PieChartDatum>({
    id,
    title,
    chartType: 'pie',
    data: filteredData,
    x: (datum) => datum.label,
    y: (datum) => datum.value,
    xLabel,
    yLabel,
    formatY,
    keyboardNavEnabled: filteredData.length > 0,
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
        <g transform={`translate(${centerX} ${centerY})`} {...a11y.getSeriesProps(0)}>
          {radius > 0 && (
            <Pie
              data={filteredData}
              pieValue={(datum) => datum.value}
              pieSort={null}
              outerRadius={radius}
              innerRadius={0}
              padAngle={0.01}
            >
              {({ arcs, path }) =>
                arcs.map((arc, index) => (
                  <path
                    key={`${arc.data.label}-${index}`}
                    d={path(arc) ?? undefined}
                    fill={colorScale(arc.data.label)}
                    stroke="var(--background, #fff)"
                    strokeWidth={2}
                    data-pie-chart-segment=""
                    {...a11y.getPointProps(0, index)}
                  />
                ))
              }
            </Pie>
          )}
        </g>
      </svg>
      <a11y.DataTable />
      {showLiveRegion && <a11y.Announcer />}
    </ThemeScope>
  );
}

export function PieChart({
  data = defaultData,
  height = 320,
  width = 640,
  ...props
}: PieChartProps) {
  return (
    <ParentSize
      debounceTime={10}
      ignoreDimensions={['height', 'top', 'left']}
      initialSize={{ width, height }}
      style={{ width: '100%', height }}
    >
      {({ width: measuredWidth }) => (
        <PieChartSvg
          {...props}
          data={data}
          height={height}
          id={props.id}
          margin={props.margin ?? defaultMargin}
          showLiveRegion={props.showLiveRegion ?? true}
          title={props.title ?? 'Pie chart'}
          width={getResponsiveWidth(measuredWidth, width)}
          xLabel={props.xLabel ?? 'Segment'}
          yLabel={props.yLabel ?? 'Value'}
        />
      )}
    </ParentSize>
  );
}
