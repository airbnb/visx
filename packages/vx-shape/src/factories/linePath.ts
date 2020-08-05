import { line as d3Line, CurveFactory, CurveFactoryLineOnly } from 'd3-shape';
import { AccessorForArrayItem } from '../types/accessor';
import setNumberOrNumberAccessor from '../util/setNumberOrNumberAccessor';

export type LinePathConfig<Datum> = {
  /** The defined accessor for the shape. The final line shape includes all points for which this function returns true. By default all points are defined. */
  defined?: AccessorForArrayItem<Datum, boolean>;
  /** Sets the curve factory (from @vx/curve or d3-curve) for the line generator. Defaults to curveLinear. */
  curve?: CurveFactory | CurveFactoryLineOnly;
  /** Sets the x0 accessor function, and sets x1 to null. */
  x?: number | AccessorForArrayItem<Datum, number>;
  /** Sets the y0 accessor function, and sets y1 to null. */
  y?: number | AccessorForArrayItem<Datum, number>;
};

export default function linePath<Datum>({ x, y, defined, curve }: LinePathConfig<Datum> = {}) {
  const path = d3Line<Datum>();
  if (x) setNumberOrNumberAccessor(path.x, x);
  if (y) setNumberOrNumberAccessor(path.y, y);
  if (defined) path.defined(defined);
  if (curve) path.curve(curve);

  return path;
}
