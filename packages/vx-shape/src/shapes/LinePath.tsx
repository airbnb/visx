import React from 'react';
import cx from 'classnames';
import { line, Line as LineType, CurveFactory, CurveFactoryLineOnly } from 'd3-shape';

export type LinePathProps<Datum> = {
  /** Array of data for which to generate a line shape. */
  data?: Datum[];
  /** Sets the curve factory (from @vx/curve or d3-curve) for the area generator. Defaults to curveLinear. */
  curve?: CurveFactory | CurveFactoryLineOnly;
  /** React RefObject passed to the path element. */
  innerRef?: React.Ref<SVGPathElement>;
  /** The defined accessor for the shape. The final line shape includes all points for which this function returns true. By default all points are defined. */
  defined?: (datum: Datum, index: number, data: Datum[]) => boolean;
  /** Given a datum, returns the x value. Defaults to d[0]. */
  x?: (datum: Datum, index: number, data: Datum[]) => number;
  /** Given a datum, returns the y value. Defaults to d[1]. */
  y?: (datum: Datum, index: number, data: Datum[]) => number;
  /** Override render function which is passed the configured path generator as input. */
  children?: (args: { path: LineType<Datum> }) => React.ReactNode;
  /** Fill color of the path element. */
  fill?: string;
  /** className applied to path element. */
  className?: string;
};

export default function LinePath<Datum>({
  children,
  data = [],
  x,
  y,
  fill = 'transparent',
  className,
  curve,
  innerRef,
  defined = () => true,
  ...restProps
}: LinePathProps<Datum> & Omit<React.SVGProps<SVGPathElement>, keyof LinePathProps<Datum>>) {
  const path = line<Datum>();
  if (x) path.x(x);
  if (y) path.y(y);
  if (defined) path.defined(defined);
  if (curve) path.curve(curve);
  if (children) return <>{children({ path })}</>;
  return (
    <path
      ref={innerRef}
      className={cx('vx-linepath', className)}
      d={path(data) || ''}
      fill={fill}
      {...restProps}
    />
  );
}
