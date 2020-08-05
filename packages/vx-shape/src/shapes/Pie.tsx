import React from 'react';
import cx from 'classnames';
import { Group } from '@vx/group';
import { Arc as ArcType, PieArcDatum as PieArcDatumType, Pie as PieType } from 'd3-shape';
import { $TSFIXME, AddSVGProps } from '../types';
import piePath, { PiePathConfig } from '../factories/piePath';
import arcPath, { ArcPathConfig } from '../factories/arcPath';

export type PieArcDatum<Datum> = PieArcDatumType<Datum>;

export type ProvidedProps<Datum> = {
  path: ArcType<$TSFIXME, PieArcDatum<Datum>>;
  arcs: PieArcDatum<Datum>[];
  pie: PieType<$TSFIXME, Datum>;
};

export type PieProps<Datum> = {
  /** className applied to path element. */
  className?: string;
  /** Top offset of rendered Pie. */
  top?: number;
  /** Left offset of rendered Pie. */
  left?: number;
  /** Array of data to generate a Pie for. */
  data?: Datum[];
  /** Optional render function invoked for each Datum to render something (e.g., a Label) at each pie centroid. */
  centroid?: (xyCoords: [number, number], arc: PieArcDatum<Datum>) => React.ReactNode;
  /** Inner radius of the Arc shape. */
  innerRadius?: ArcPathConfig<PieArcDatum<Datum>>['innerRadius'];
  /** Outer radius of the Arc shape. */
  outerRadius?: ArcPathConfig<PieArcDatum<Datum>>['outerRadius'];
  /** Corner radius of the Arc shape. */
  cornerRadius?: ArcPathConfig<PieArcDatum<Datum>>['cornerRadius'];
  /** Padding radius of the Arc shape, which determines the fixed linear distance separating adjacent arcs. */
  padRadius?: ArcPathConfig<PieArcDatum<Datum>>['padRadius'];
  /** Returns the start angle of the overall Pie shape (the first value starts at startAngle), with 0 at -y (12 o’clock) and positive angles proceeding clockwise. */
  startAngle?: PiePathConfig<Datum>['startAngle'];
  /** Returns the end angle of the overall Pie shape (the last value ends at endAngle), with 0 at -y (12 o’clock) and positive angles proceeding clockwise. */
  endAngle?: PiePathConfig<Datum>['endAngle'];
  /** Padding angle of the Pie shape, which sets a fixed linear distance separating adjacent arcs. */
  padAngle?: PiePathConfig<Datum>['padAngle'];
  /** Invoked for each datum, returns the value for a given Pie segment/arc datum. */
  pieValue?: PiePathConfig<Datum>['value'];
  /** Comparator function to sort *arcs*, overridden by pieSortValues if defined. If pieSort and pieSortValues are null, arcs match input data order. */
  pieSort?: PiePathConfig<Datum>['sort'];
  /** Comparator function to sort arc *values*, overrides pieSort if defined. If pieSort and pieSortValues are null, arcs match input data order. */
  pieSortValues?: PiePathConfig<Datum>['sortValues'];
  /** Render function override which is passed the configured arc generator as input. */
  children?: (provided: ProvidedProps<Datum>) => React.ReactNode;
};

export default function Pie<Datum>({
  className,
  top,
  left,
  data = [],
  centroid,
  innerRadius = 0,
  outerRadius,
  cornerRadius,
  startAngle,
  endAngle,
  padAngle,
  padRadius,
  pieSort,
  pieSortValues,
  pieValue,
  children,
  ...restProps
}: AddSVGProps<PieProps<Datum>, SVGPathElement>) {
  const path = arcPath<PieArcDatum<Datum>>({
    innerRadius,
    outerRadius,
    cornerRadius,
    padRadius,
  });

  const pie = piePath<Datum>({
    startAngle,
    endAngle,
    padAngle,
    value: pieValue,
    sort: pieSort,
    sortValues: pieSortValues,
  });

  const arcs = pie(data);
  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (children) return <>{children({ arcs, path, pie })}</>;

  return (
    <Group className="vx-pie-arcs-group" top={top} left={left}>
      {arcs.map((arc, i) => (
        <g key={`pie-arc-${i}`}>
          <path className={cx('vx-pie-arc', className)} d={path(arc) || ''} {...restProps} />
          {centroid?.(path.centroid(arc), arc)}
        </g>
      ))}
    </Group>
  );
}
