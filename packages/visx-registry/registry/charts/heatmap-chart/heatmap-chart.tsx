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
import { HeatmapRect } from '@visx/heatmap';
import { ParentSize } from '@visx/responsive';
import { useScale } from '@visx/scale/react';
import { ThemeScope } from '@visx/theme';
import { useColor } from '@visx/theme/react';

export type HeatmapCellDatum = {
  x: string;
  y: string;
  value: number;
};

type HeatmapColumnDatum = {
  x: string;
  bins: { pointIndex?: number; y: string; value: number }[];
};

export type HeatmapChartMargin = MarginShape;

export type HeatmapChartProps = Omit<SVGProps<SVGSVGElement>, 'children' | 'height' | 'width'> & {
  data?: HeatmapCellDatum[];
  height?: number;
  margin?: HeatmapChartMargin;
  showLiveRegion?: boolean;
  title?: string;
  width?: number;
  xLabel?: string;
  yLabel?: string;
};

type HeatmapChartSvgProps = Required<
  Pick<
    HeatmapChartProps,
    'data' | 'height' | 'margin' | 'showLiveRegion' | 'title' | 'width' | 'xLabel' | 'yLabel'
  >
> &
  Omit<
    HeatmapChartProps,
    'data' | 'height' | 'margin' | 'showLiveRegion' | 'title' | 'width' | 'xLabel' | 'yLabel'
  >;

const defaultData: HeatmapCellDatum[] = [
  { x: 'Mon', y: 'Search', value: 22 },
  { x: 'Tue', y: 'Search', value: 28 },
  { x: 'Wed', y: 'Search', value: 31 },
  { x: 'Thu', y: 'Search', value: 36 },
  { x: 'Fri', y: 'Search', value: 42 },
  { x: 'Mon', y: 'Invite', value: 18 },
  { x: 'Tue', y: 'Invite', value: 24 },
  { x: 'Wed', y: 'Invite', value: 29 },
  { x: 'Thu', y: 'Invite', value: 33 },
  { x: 'Fri', y: 'Invite', value: 38 },
  { x: 'Mon', y: 'Export', value: 10 },
  { x: 'Tue', y: 'Export', value: 16 },
  { x: 'Wed', y: 'Export', value: 21 },
  { x: 'Thu', y: 'Export', value: 26 },
  { x: 'Fri', y: 'Export', value: 31 },
  { x: 'Mon', y: 'Share', value: 14 },
  { x: 'Tue', y: 'Share', value: 19 },
  { x: 'Wed', y: 'Share', value: 24 },
  { x: 'Thu', y: 'Share', value: 30 },
  { x: 'Fri', y: 'Share', value: 35 },
];

const defaultMargin = {
  top: 24,
  right: 24,
  bottom: 40,
  left: 72,
};

function getOrderedValues(values: readonly string[]) {
  return Array.from(new Set(values));
}

function getColumns(data: readonly HeatmapCellDatum[]) {
  const xValues = getOrderedValues(data.map((datum) => datum.x));
  const yValues = getOrderedValues(data.map((datum) => datum.y));
  const cellsByX = new Map<string, Map<string, { pointIndex: number; value: number }>>();

  data.forEach((datum, pointIndex) => {
    const cellsByY =
      cellsByX.get(datum.x) ?? new Map<string, { pointIndex: number; value: number }>();

    cellsByY.set(datum.y, {
      pointIndex,
      value: Number.isFinite(datum.value) ? datum.value : 0,
    });
    cellsByX.set(datum.x, cellsByY);
  });

  return xValues.map<HeatmapColumnDatum>((x) => ({
    x,
    bins: yValues.map((y) => {
      const cell = cellsByX.get(x)?.get(y);

      return {
        pointIndex: cell?.pointIndex,
        y,
        value: cell?.value ?? 0,
      };
    }),
  }));
}

function getValueDomain(data: readonly HeatmapCellDatum[]): [number, number] {
  return getPositiveDomain(data.map((datum) => datum.value));
}

function formatY(value: number) {
  return new Intl.NumberFormat('en-US').format(value);
}

function HeatmapChartSvg({
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
}: HeatmapChartSvgProps) {
  const dimensions = useChartDimensions({ width, height, margin });
  const columns = useMemo(() => getColumns(data), [data]);
  const xValues = useMemo(() => columns.map((column) => column.x), [columns]);
  const yValues = useMemo(() => columns[0]?.bins.map((bin) => bin.y) ?? [], [columns]);
  const valueDomain = useMemo(() => getValueDomain(data), [data]);
  const opacityScale = useScale({
    type: 'linear',
    domain: valueDomain,
    range: [0.16, 0.9],
  });
  const cellColor = useColor(0);
  const labelColor = useColor('textMuted');
  const a11y = useChartA11y<HeatmapCellDatum>({
    id,
    title,
    chartType: 'heatmap',
    data,
    x: (datum) => `${datum.x} ${datum.y}`,
    y: (datum) => datum.value,
    xLabel,
    yLabel,
    formatY,
    keyboardNavEnabled: data.length > 0,
    series: [{ label: title }],
  });
  const binWidth = xValues.length > 0 ? dimensions.innerWidth / xValues.length : 0;
  const binHeight = yValues.length > 0 ? dimensions.innerHeight / yValues.length : 0;

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
          <HeatmapRect
            data={columns}
            xScale={(index) => index * binWidth}
            yScale={(index) => index * binHeight}
            binWidth={binWidth}
            binHeight={binHeight}
            colorScale={() => cellColor}
            opacityScale={(value) => opacityScale(value) ?? 0.16}
            bins={(column) => column.bins}
            count={(bin) => bin.value}
            gap={4}
          >
            {(heatmap) =>
              heatmap.flatMap((column) =>
                column.map((cell) => {
                  const pointProps =
                    cell.bin.pointIndex == null ? {} : a11y.getPointProps(0, cell.bin.pointIndex);

                  return (
                    <rect
                      key={JSON.stringify([cell.datum.x, cell.bin.y])}
                      x={cell.x}
                      y={cell.y}
                      width={Math.max(0, cell.width)}
                      height={Math.max(0, cell.height)}
                      rx={4}
                      fill={cell.color}
                      fillOpacity={cell.opacity}
                      data-heatmap-chart-cell=""
                      {...pointProps}
                    />
                  );
                }),
              )
            }
          </HeatmapRect>
          {xValues.map((value, index) => (
            <text
              key={value}
              x={index * binWidth + binWidth / 2}
              y={dimensions.innerHeight + 20}
              fill={labelColor}
              fontSize={11}
              textAnchor="middle"
            >
              {value}
            </text>
          ))}
          {yValues.map((value, index) => (
            <text
              key={value}
              x={-10}
              y={index * binHeight + binHeight / 2}
              dy="0.32em"
              fill={labelColor}
              fontSize={11}
              textAnchor="end"
            >
              {value}
            </text>
          ))}
        </g>
      </svg>
      <a11y.DataTable />
      {showLiveRegion && <a11y.Announcer />}
    </ThemeScope>
  );
}

export function HeatmapChart({
  data = defaultData,
  height = 320,
  width = 640,
  ...props
}: HeatmapChartProps) {
  return (
    <ParentSize
      debounceTime={10}
      ignoreDimensions={['height', 'top', 'left']}
      initialSize={{ width, height }}
      style={{ width: '100%', height }}
    >
      {({ width: measuredWidth }) => (
        <HeatmapChartSvg
          {...props}
          data={data}
          height={height}
          id={props.id}
          margin={props.margin ?? defaultMargin}
          showLiveRegion={props.showLiveRegion ?? true}
          title={props.title ?? 'Heatmap Chart'}
          width={getResponsiveWidth(measuredWidth, width)}
          xLabel={props.xLabel ?? 'Cell'}
          yLabel={props.yLabel ?? 'Value'}
        />
      )}
    </ParentSize>
  );
}
