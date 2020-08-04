import { Area as AreaType, CurveFactory } from 'd3-shape';
import { AccessorForArrayItem } from './accessor';

export type BaseAreaProps<Datum> = {
  /** Override render function which is passed the configured area generator as input. */
  children?: (args: { path: AreaType<Datum> }) => React.ReactNode;
  /** Classname applied to path element. */
  className?: string;
  /** Array of data for which to generate an area shape. */
  data?: Datum[];
  /** The defined accessor for the shape. The final area shape includes all points for which this function returns true. By default all points are defined. */
  defined?: AccessorForArrayItem<Datum, boolean>;
  /** Sets the curve factory (from @vx/curve or d3-curve) for the area generator. Defaults to curveLinear. */
  curve?: CurveFactory;
  /** React RefObject passed to the path element. */
  innerRef?: React.Ref<SVGPathElement>;
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
