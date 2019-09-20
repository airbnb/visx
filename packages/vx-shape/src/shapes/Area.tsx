import React from 'react';
import cx from 'classnames';
import { area, Area as AreaType, CurveFactory } from 'd3-shape';

type Accessor<Datum> = (datum: Datum, index: number, data: Datum[]) => number;

export type AreaProps<Datum> = {
  /** Override render function which is passed the configured area generator as input. */
  children?: (args: { path: AreaType<Datum> }) => React.ReactNode;
  /** Classname applied to path element. */
  className?: string;
  /** Array of data for which to generate an area shape. */
  data?: Datum[];
  /** The defined accessor for the shape. The final area shape includes all points for which this function returns true. By default all points are defined. */
  defined?: (datum: Datum, index: number, data: Datum[]) => boolean;
  /** Sets the curve factory (from @vx/curve or d3-curve) for the area generator. Defaults to curveLinear. */
  curve?: CurveFactory;
  /** React RefObject passed to the path element. */
  innerRef?: React.Ref<SVGPathElement>;
  /** Sets the x0 accessor function, and sets x1 to null. */
  x?: Accessor<Datum>;
  /** Specifies the x0 accessor function which defaults to d => d[0]. */
  x0?: Accessor<Datum>;
  /** Specifies the x1 accessor function which defaults to null. */
  x1?: Accessor<Datum>;
  /** Sets the y0 accessor function, and sets y1 to null. */
  y?: Accessor<Datum>;
  /** Specifies the y0 accessor function which defaults to d => 0. */
  y0?: Accessor<Datum>;
  /** Specifies the y1 accessor function which defaults to d => d[1]. */
  y1?: Accessor<Datum>;
};

export default function Area<Datum>({
  children,
  x,
  x0,
  x1,
  y,
  y0,
  y1,
  data = [],
  defined = () => true,
  className,
  curve,
  innerRef,
  ...restProps
}: AreaProps<Datum> & Omit<React.SVGProps<SVGPathElement>, keyof AreaProps<Datum>>) {
  const path = area<Datum>();
  if (x) path.x(x);
  if (x0) path.x0(x0);
  if (x1) path.x1(x1);
  if (y) path.y(y);
  if (y0) path.y0(y0);
  if (y1) path.y1(y1);
  if (defined) path.defined(defined);
  if (curve) path.curve(curve);
  if (children) return <>{children({ path })}</>;
  return (
    <path ref={innerRef} className={cx('vx-area', className)} d={path(data) || ''} {...restProps} />
  );
}
