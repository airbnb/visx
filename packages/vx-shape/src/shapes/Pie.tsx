/* eslint-disable @typescript-eslint/unbound-method */
import React from 'react';
import cx from 'classnames';
import { Group } from '@vx/group';
import {
  arc as d3Arc,
  Arc as ArcType,
  PieArcDatum as PieArcDatumType,
  pie as d3Pie,
  Pie as PieType,
} from 'd3-shape';
import setNumOrAccessor, { NumberAccessor as NumAccessor } from '../util/setNumberOrNumberAccessor';
import { $TSFIXME } from '../types';

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
  /** Invoked for each datum, returns the value for a given Pie segment/arc datum. */
  pieValue?: NumAccessor<Datum>;
  /** Comparator function to sort *arcs*, overridden by pieSortValues if defined. If pieSort and pieSortValues are null, arcs match input data order. */
  pieSort?: null | ((a: Datum, b: Datum) => number);
  /** Comparator function to sort arc *values*, overrides pieSort if defined. If pieSort and pieSortValues are null, arcs match input data order. */
  pieSortValues?: null | ((a: number, b: number) => number);
  /** Optional render function invoked for each Datum to render something (e.g., a Label) at each pie centroid. */
  centroid?: (xyCoords: [number, number], arc: PieArcDatum<Datum>) => React.ReactNode;
  /** Inner radius of the Arc shape. */
  innerRadius?: NumAccessor<Datum> | number;
  /** Inner radius of the Arc shape. */
  outerRadius?: NumAccessor<Datum> | number;
  /** Inner radius of the Arc shape. */
  cornerRadius?: NumAccessor<Datum> | number;
  /** Padding radius of the Arc shape, which determines the fixed linear distance separating adjacent arcs. */
  padRadius?: NumAccessor<Datum> | number;
  /** Returns the start angle of the overall Pie shape (the first value starts at startAngle), with 0 at -y (12 o’clock) and positive angles proceeding clockwise. */
  startAngle?: NumAccessor<Datum> | number;
  /** Returns the end angle of the overall Pie shape (the last value ends at endAngle), with 0 at -y (12 o’clock) and positive angles proceeding clockwise. */
  endAngle?: NumAccessor<Datum> | number;
  /** Padding angle of the Pie shape, which sets a fixed linear distance separating adjacent arcs. */
  padAngle?: NumAccessor<Datum> | number;
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
}: PieProps<Datum> & Omit<React.SVGProps<SVGPathElement>, keyof PieProps<Datum>>) {
  const path = d3Arc<PieArcDatum<Datum>>();

  if (innerRadius != null) setNumOrAccessor<NumAccessor<Datum>>(path.innerRadius, innerRadius);
  if (outerRadius != null) setNumOrAccessor<NumAccessor<Datum>>(path.outerRadius, outerRadius);
  if (cornerRadius != null) setNumOrAccessor<NumAccessor<Datum>>(path.cornerRadius, cornerRadius);
  if (padRadius != null) setNumOrAccessor<NumAccessor<Datum>>(path.padRadius, padRadius);

  const pie = d3Pie<Datum>();
  // ts can't distinguish between these method overloads
  if (pieSort === null) pie.sort(pieSort);
  else if (pieSort != null) pie.sort(pieSort);
  if (pieSortValues === null) pie.sortValues(pieSortValues);
  else if (pieSortValues != null) pie.sortValues(pieSortValues);

  if (pieValue != null) pie.value(pieValue);
  if (padAngle != null) setNumOrAccessor<NumAccessor<Datum>>(pie.padAngle, padAngle);
  if (startAngle != null) setNumOrAccessor<NumAccessor<Datum>>(pie.startAngle, startAngle);
  if (endAngle != null) setNumOrAccessor<NumAccessor<Datum>>(pie.endAngle, endAngle);

  const arcs = pie(data);
  if (children) return <>{children({ arcs, path, pie })}</>;

  return (
    <Group className="vx-pie-arcs-group" top={top} left={left}>
      {arcs.map((arc, i) => (
        <g key={`pie-arc-${i}`}>
          <path className={cx('vx-pie-arc', className)} d={path(arc) || ''} {...restProps} />
          {centroid && centroid(path.centroid(arc), arc)}
        </g>
      ))}
    </Group>
  );
}
