import {
  arc as d3Arc,
  area as d3Area,
  line as d3Line,
  pie as d3Pie,
  radialLine as d3RadialLine,
  stack as d3Stack,
} from '@visx/vendor/d3-shape';
import setNumberOrNumberAccessor from './setNumberOrNumberAccessor';
import type {
  ArcPathConfig,
  AreaPathConfig,
  LinePathConfig,
  PiePathConfig,
  RadialLinePathConfig,
  StackPathConfig,
} from '../types';
import stackOrder from './stackOrder';
import stackOffset from './stackOffset';

export function arc<Datum>({
  innerRadius,
  outerRadius,
  cornerRadius,
  startAngle,
  endAngle,
  padAngle,
  padRadius,
}: ArcPathConfig<Datum> = {}) {
  const path = d3Arc<Datum>();
  if (innerRadius != null) setNumberOrNumberAccessor(path.innerRadius, innerRadius);
  if (outerRadius != null) setNumberOrNumberAccessor(path.outerRadius, outerRadius);
  if (cornerRadius != null) setNumberOrNumberAccessor(path.cornerRadius, cornerRadius);
  if (startAngle != null) setNumberOrNumberAccessor(path.startAngle, startAngle);
  if (endAngle != null) setNumberOrNumberAccessor(path.endAngle, endAngle);
  if (padAngle != null) setNumberOrNumberAccessor(path.padAngle, padAngle);
  if (padRadius != null) setNumberOrNumberAccessor(path.padRadius, padRadius);

  return path;
}

export function area<Datum>({ x, x0, x1, y, y0, y1, defined, curve }: AreaPathConfig<Datum> = {}) {
  const path = d3Area<Datum>();
  if (x) setNumberOrNumberAccessor(path.x, x);
  if (x0) setNumberOrNumberAccessor(path.x0, x0);
  if (x1) setNumberOrNumberAccessor(path.x1, x1);
  if (y) setNumberOrNumberAccessor(path.y, y);
  if (y0) setNumberOrNumberAccessor(path.y0, y0);
  if (y1) setNumberOrNumberAccessor(path.y1, y1);
  if (defined) path.defined(defined);
  if (curve) path.curve(curve);

  return path;
}

export function line<Datum>({ x, y, defined, curve }: LinePathConfig<Datum> = {}) {
  const path = d3Line<Datum>();
  if (x) setNumberOrNumberAccessor(path.x, x);
  if (y) setNumberOrNumberAccessor(path.y, y);
  if (defined) path.defined(defined);
  if (curve) path.curve(curve);

  return path;
}

export function pie<Datum>({
  startAngle,
  endAngle,
  padAngle,
  value,
  sort,
  sortValues,
}: PiePathConfig<Datum> = {}) {
  const path = d3Pie<Datum>();

  // In d3-shape v3+, sortValues defaults to descending sort.
  // To maintain visx's behavior of preserving input order by default,
  // we explicitly set sortValues to null when neither sort nor sortValues is provided.
  // Note: d3's pie generator clears sortValues when sort is set, and vice versa.
  if (sortValues !== undefined) {
    path.sortValues(sortValues);
  } else if (sort === undefined) {
    // Neither provided - disable sorting to preserve input order
    path.sortValues(null);
  } else if (sort === null) {
    // explicit null: clear comparator
    path.sort(null);
  } else {
    // here sort is narrowed to a comparator function
    path.sort(sort);
  }

  if (value != null) path.value(value);

  if (padAngle != null) setNumberOrNumberAccessor(path.padAngle, padAngle);
  if (startAngle != null) setNumberOrNumberAccessor(path.startAngle, startAngle);
  if (endAngle != null) setNumberOrNumberAccessor(path.endAngle, endAngle);

  return path;
}

export function radialLine<Datum>({
  angle,
  radius,
  defined,
  curve,
}: RadialLinePathConfig<Datum> = {}) {
  const path = d3RadialLine<Datum>();
  if (angle) setNumberOrNumberAccessor(path.angle, angle);
  if (radius) setNumberOrNumberAccessor(path.radius, radius);
  if (defined) path.defined(defined);
  if (curve) path.curve(curve);

  return path;
}

export function stack<Datum, Key>({ keys, value, order, offset }: StackPathConfig<Datum, Key>) {
  const path = d3Stack<Datum, Key>();
  if (keys) path.keys(keys);
  if (value) setNumberOrNumberAccessor(path.value, value);
  if (order) path.order(stackOrder(order));
  if (offset) path.offset(stackOffset(offset));

  return path;
}
