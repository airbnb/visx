import { pie as d3Pie } from 'd3-shape';
import { Accessor } from '../types/accessor';
import setNumberOrNumberAccessor from '../util/setNumberOrNumberAccessor';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AngleAccessor<Datum> = (this: any, data: Datum[], ...args: any[]) => number;

export type PiePathConfig<Datum> = {
  /** Returns the start angle of the overall Pie shape (the first value starts at startAngle), with 0 at -y (12 o’clock) and positive angles proceeding clockwise. */
  startAngle?: number | AngleAccessor<Datum>;
  /** Returns the end angle of the overall Pie shape (the last value ends at endAngle), with 0 at -y (12 o’clock) and positive angles proceeding clockwise. */
  endAngle?: number | AngleAccessor<Datum>;
  /** Padding angle of the Pie shape, which sets a fixed linear distance separating adjacent arcs. */
  padAngle?: number | AngleAccessor<Datum>;
  /** Invoked for each datum, returns the value for a given Pie segment/arc datum. */
  value?: Accessor<Datum, number>;
  /** Comparator function to sort *arcs*, overridden by sortValues if defined. If sort and sortValues are null, arcs match input data order. */
  sort?: null | ((a: Datum, b: Datum) => number);
  /** Comparator function to sort arc *values*, overrides sort if defined. If sort and sortValues are null, arcs match input data order. */
  sortValues?: null | ((a: number, b: number) => number);
};

export default function piePath<Datum>({
  startAngle,
  endAngle,
  padAngle,
  value,
  sort,
  sortValues,
}: PiePathConfig<Datum> = {}) {
  const path = d3Pie<Datum>();

  // ts can't distinguish between these method overloads
  if (sort === null) path.sort(sort);
  else if (sort != null) path.sort(sort);
  if (sortValues === null) path.sortValues(sortValues);
  else if (sortValues != null) path.sortValues(sortValues);

  if (value != null) path.value(value);

  if (padAngle != null) setNumberOrNumberAccessor(path.padAngle, padAngle);
  if (startAngle != null) setNumberOrNumberAccessor(path.startAngle, startAngle);
  if (endAngle != null) setNumberOrNumberAccessor(path.endAngle, endAngle);

  return path;
}
