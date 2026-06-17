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
import { hierarchy, Treemap as VisxTreemap, treemapSquarify } from '@visx/hierarchy';
import { ParentSize } from '@visx/responsive';
import { useScale } from '@visx/scale/react';
import { ThemeScope } from '@visx/theme';
import { useColor } from '@visx/theme/react';

export type TreemapDatum = {
  x: string;
  y: number;
  group?: string;
};

type TreemapNode = {
  group?: string;
  name: string;
  pointIndex?: number;
  value?: number;
  children?: TreemapNode[];
};

export type TreemapChartMargin = MarginShape;

export type TreemapChartProps = Omit<SVGProps<SVGSVGElement>, 'children' | 'height' | 'width'> & {
  data?: TreemapDatum[];
  height?: number;
  margin?: TreemapChartMargin;
  showLiveRegion?: boolean;
  title?: string;
  width?: number;
  xLabel?: string;
  yLabel?: string;
};

type TreemapChartSvgProps = Required<
  Pick<
    TreemapChartProps,
    'data' | 'height' | 'margin' | 'showLiveRegion' | 'title' | 'width' | 'xLabel' | 'yLabel'
  >
> &
  Omit<
    TreemapChartProps,
    'data' | 'height' | 'margin' | 'showLiveRegion' | 'title' | 'width' | 'xLabel' | 'yLabel'
  >;

const defaultData: TreemapDatum[] = [
  { x: 'Enterprise', y: 42, group: 'Accounts' },
  { x: 'Mid-market', y: 31, group: 'Accounts' },
  { x: 'Startup', y: 18, group: 'Accounts' },
  { x: 'Expansion', y: 26, group: 'Pipeline' },
  { x: 'Renewal', y: 22, group: 'Pipeline' },
  { x: 'Self serve', y: 14, group: 'Pipeline' },
];

const defaultMargin = {
  top: 18,
  right: 18,
  bottom: 18,
  left: 18,
};

function getHierarchyData(data: readonly TreemapDatum[]): TreemapNode {
  const groups = new Map<string, { datum: TreemapDatum; pointIndex: number }[]>();

  data.forEach((datum, pointIndex) => {
    const group = datum.group ?? 'Data';
    const current = groups.get(group) ?? [];

    current.push({ datum, pointIndex });
    groups.set(group, current);
  });

  return {
    name: 'root',
    children: Array.from(groups.entries()).map(([name, children]) => ({
      name,
      children: children.map(({ datum, pointIndex }) => ({
        group: name,
        name: datum.x,
        pointIndex,
        value: Number.isFinite(datum.y) ? Math.max(0, datum.y) : 0,
      })),
    })),
  };
}

function getValueDomain(data: readonly TreemapDatum[]): [number, number] {
  return getPositiveDomain(data.map((datum) => datum.y));
}

function formatY(value: number) {
  return new Intl.NumberFormat('en-US').format(value);
}

function TreemapChartSvg({
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
}: TreemapChartSvgProps) {
  const dimensions = useChartDimensions({ width, height, margin });
  const root = useMemo(
    () =>
      hierarchy(getHierarchyData(data))
        .sum((datum) => datum.value ?? 0)
        .sort((a, b) => (b.value ?? 0) - (a.value ?? 0)),
    [data],
  );
  const valueDomain = useMemo(() => getValueDomain(data), [data]);
  const opacityScale = useScale({
    type: 'linear',
    domain: valueDomain,
    range: [0.2, 0.88],
  });
  const cellColor = useColor(0);
  const borderColor = useColor('background');
  const labelColor = useColor('textPrimary');
  const a11y = useChartA11y<TreemapDatum>({
    id,
    title,
    data,
    x: (datum) => datum.x,
    y: (datum) => datum.y,
    xLabel,
    yLabel,
    formatY,
    keyboardNavEnabled: data.length > 0,
    locale: {
      chartRoleDescription: 'treemap chart',
    },
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
        <g
          transform={`translate(${dimensions.margin.left} ${dimensions.margin.top})`}
          {...a11y.getSeriesProps(0)}
        >
          {data.length > 0 && (
            <VisxTreemap
              root={root}
              size={[dimensions.innerWidth, dimensions.innerHeight]}
              tile={treemapSquarify}
              round
              paddingInner={3}
              paddingOuter={3}
            >
              {(treemap) =>
                treemap.leaves().map((node) => {
                  const datumIndex = node.data.pointIndex;
                  const pointProps = datumIndex == null ? {} : a11y.getPointProps(0, datumIndex);
                  const nodeWidth = Math.max(0, node.x1 - node.x0);
                  const nodeHeight = Math.max(0, node.y1 - node.y0);

                  return (
                    <g
                      key={`${node.data.group ?? 'Data'}-${node.data.name}-${datumIndex ?? 0}`}
                      transform={`translate(${node.x0} ${node.y0})`}
                    >
                      <rect
                        width={nodeWidth}
                        height={nodeHeight}
                        rx={4}
                        fill={cellColor}
                        fillOpacity={opacityScale(node.value ?? 0) ?? 0.2}
                        stroke={borderColor}
                        strokeWidth={2}
                        data-treemap-chart-cell=""
                        {...pointProps}
                      />
                      {nodeWidth > 72 && nodeHeight > 30 && (
                        <text
                          x={8}
                          y={18}
                          fill={labelColor}
                          fillOpacity={0.82}
                          fontSize={11}
                          fontWeight={600}
                        >
                          {node.data.name}
                        </text>
                      )}
                    </g>
                  );
                })
              }
            </VisxTreemap>
          )}
        </g>
      </svg>
      <a11y.DataTable />
      {showLiveRegion && <a11y.Announcer />}
    </ThemeScope>
  );
}

export function TreemapChart({
  data = defaultData,
  height = 320,
  width = 640,
  ...props
}: TreemapChartProps) {
  return (
    <ParentSize
      debounceTime={10}
      ignoreDimensions={['height', 'top', 'left']}
      initialSize={{ width, height }}
      style={{ width: '100%', height }}
    >
      {({ width: measuredWidth }) => (
        <TreemapChartSvg
          {...props}
          data={data}
          height={height}
          id={props.id}
          margin={props.margin ?? defaultMargin}
          showLiveRegion={props.showLiveRegion ?? true}
          title={props.title ?? 'Treemap Chart'}
          width={getResponsiveWidth(measuredWidth, width)}
          xLabel={props.xLabel ?? 'Category'}
          yLabel={props.yLabel ?? 'Value'}
        />
      )}
    </ParentSize>
  );
}
