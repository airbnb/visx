import { arc as d3Arc } from 'd3-shape';
import { Accessor } from '../types/accessor';
import setNumberOrNumberAccessor from '../util/setNumberOrNumberAccessor';

export type ArcPathConfig<Datum> = {
  /** Number or accessor function which returns a number, which defines the arc innerRadius. */
  innerRadius?: number | Accessor<Datum, number>;
  /** Number or accessor function which returns a number, which defines the arc outerRadius. */
  outerRadius?: number | Accessor<Datum, number>;
  /** Number or accessor function which returns a number, which defines the arc cornerRadius. */
  cornerRadius?: number | Accessor<Datum, number>;
  /** Number or accessor function which returns a number, which defines the arc startAngle. */
  startAngle?: number | Accessor<Datum, number>;
  /** Number or accessor function which returns a number, which defines the arc endAngle. */
  endAngle?: number | Accessor<Datum, number>;
  /** Number or accessor function which returns a number, which defines the arc padAngle. */
  padAngle?: number | Accessor<Datum, number>;
  /** Number or accessor function which returns a number, which defines the arc padRadius. */
  padRadius?: number | Accessor<Datum, number>;
};

export default function arcPath<Datum>({
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
