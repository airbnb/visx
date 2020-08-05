import { area as d3Area, CurveFactory } from 'd3-shape';
import { AccessorForArrayItem } from '../types/accessor';
import setNumberOrNumberAccessor from '../util/setNumberOrNumberAccessor';

export type AreaPathConfig<Datum> = {
  /** The defined accessor for the shape. The final area shape includes all points for which this function returns true. By default all points are defined. */
  defined?: AccessorForArrayItem<Datum, boolean>;
  /** Sets the curve factory (from @vx/curve or d3-curve) for the area generator. Defaults to curveLinear. */
  curve?: CurveFactory;
  /** Sets the x0 accessor function, and sets x1 to null. */
  x?: number | AccessorForArrayItem<Datum, number>;
  /** Specifies the x0 accessor function which defaults to d => d[0]. */
  x0?: number | AccessorForArrayItem<Datum, number>;
  /** Specifies the x1 accessor function which defaults to null. */
  x1?: number | AccessorForArrayItem<Datum, number>;
  /** Sets the y0 accessor function, and sets y1 to null. */
  y?: number | AccessorForArrayItem<Datum, number>;
  /** Specifies the y0 accessor function which defaults to d => 0. */
  y0?: number | AccessorForArrayItem<Datum, number>;
  /** Specifies the y1 accessor function which defaults to d => d[1]. */
  y1?: number | AccessorForArrayItem<Datum, number>;
};

export default function areaPath<Datum>({
  x,
  x0,
  x1,
  y,
  y0,
  y1,
  defined,
  curve,
}: AreaPathConfig<Datum> = {}) {
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
