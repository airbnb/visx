import React from 'react';
import cx from 'classnames';
import { Group } from '@vx/group';
import { arc as d3Arc, Arc as ArcType, PieArcDatum, pie as d3Pie, Pie as PieType } from 'd3-shape';

type NumberAccessor<Datum> = (d: Datum) => number;

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
  pieValue?: NumberAccessor<Datum>;
  /** Comparator function to sort *arcs* different from input data order. Overridden by pieSortValues if defined. */
  pieSort?: (a: Datum, b: Datum) => number;
  /** Comparator function to sort arc *values* different from input data order. Overrides pieSort if defined. */
  pieSortValues?: (a: number, b: number) => number;
  /** Optional render function invoked for each Datum to render something (e.g., a Label) at each pie centroid. */
  centroid?: (xyCoords: [number, number], arc: PieArcDatum<Datum>) => React.ReactNode;
  /** Inner radius of the Arc shape. */
  innerRadius?: NumberAccessor<Datum> | number;
  /** Inner radius of the Arc shape. */
  outerRadius?: NumberAccessor<Datum> | number;
  /** Inner radius of the Arc shape. */
  cornerRadius?: NumberAccessor<Datum> | number;
  /** Padding radius of the Arc shape, which determines the fixed linear distance separating adjacent arcs. */
  padRadius?: NumberAccessor<Datum> | number;
  /** Returns the start angle of the overall Pie shape (the first value starts at startAngle), with 0 at -y (12 o’clock) and positive angles proceeding clockwise. */
  startAngle?: NumberAccessor<Datum> | number;
  /** Returns the end angle of the overall Pie shape (the last value ends at endAngle), with 0 at -y (12 o’clock) and positive angles proceeding clockwise. */
  endAngle?: NumberAccessor<Datum> | number;
  /** Padding angle of the Pie shape, which sets a fixed linear distance separating adjacent arcs. */
  padAngle?: NumberAccessor<Datum> | number;
  /** Override render function override which is passed the configured arc generator as input. */
  children?: (args: {
    path: ArcType<any, Datum>;
    arcs: PieArcDatum<Datum>[];
    pie: PieType<any, Datum>;
  }) => React.ReactNode;
};

class PieChart<DataShape> {
  public innerRadius(num: number): void {}
  public innerRadius(func: (d: DataShape) => number): void {}
}

type Datum = { value: number };
const pie = new PieChart<Datum>();

pie.innerRadius(); // error
pie.innerRadius(123); // okay
pie.innerRadius((d: Datum) => d.value); // okay

const asProp1 = (_: number) => pie.innerRadius(_); // okay
const asProp2 = (_: Datum) => pie.innerRadius(_); // okay
const asProp3 = (_: number | Datum) => pie.innerRadius(_); // okay

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
}: PieProps<Datum> & React.SVGProps<SVGPathElement>) {
  const path = d3Arc<Datum>();
  if (innerRadius != null) path.innerRadius(innerRadius as number);
  if (outerRadius != null) path.outerRadius(outerRadius as NumberAccessor<Datum>);
  if (cornerRadius != null) path.cornerRadius(cornerRadius);
  if (padRadius != null) path.padRadius(padRadius);

  const pie = d3Pie<Datum>();
  if (pieSort != null) pie.sort(pieSort);
  if (pieSortValues != null) pie.sortValues(pieSortValues);
  if (pieValue != null) pie.value(pieValue);
  if (padAngle != null) pie.padAngle(padAngle);
  if (startAngle != null) pie.startAngle(startAngle);
  if (endAngle != null) pie.endAngle(endAngle);

  const arcs = pie(data);

  if (children) return children({ arcs, path, pie });

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
