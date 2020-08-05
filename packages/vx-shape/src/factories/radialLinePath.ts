import { radialLine as d3RadialLine, CurveFactory, CurveFactoryLineOnly } from 'd3-shape';
import { AccessorForArrayItem } from '../types/accessor';
import setNumberOrNumberAccessor from '../util/setNumberOrNumberAccessor';

export type RadialLinePathConfig<Datum> = {
  /** The defined accessor for the shape. The final radialLine shape includes all points for which this function returns true. By default all points are defined. */
  defined?: AccessorForArrayItem<Datum, boolean>;
  /** Sets the curve factory (from @vx/curve or d3-curve) for the radialLine generator. Defaults to curveLinear. */
  curve?: CurveFactory | CurveFactoryLineOnly;
  /** Returns the angle value in radians for a given Datum, with 0 at -y (12 o’clock). */
  angle?: number | AccessorForArrayItem<Datum, number>;
  /** Returns the radius value in radians for a given Datum, with 0 at the center. */
  radius?: number | AccessorForArrayItem<Datum, number>;
};

export default function radialLinePath<Datum>({
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
