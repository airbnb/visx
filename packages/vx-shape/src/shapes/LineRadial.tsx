import React from 'react';
import cx from 'classnames';
import { radialLine, RadialLine } from 'd3-shape';
import { LinePathProps } from './LinePath';

export type LineRadialProps<Datum> = Pick<
  LinePathProps<Datum>,
  'className' | 'curve' | 'data' | 'defined' | 'fill' | 'innerRef'
> & {
  /** Override render function which is passed the configured path generator as input. */
  children?: (args: { path: RadialLine<Datum> }) => React.ReactNode;
  /** Returns the angle value in radians for a given Datum, with 0 at -y (12 o’clock). */
  angle?: (datum: Datum, index: number, data: Datum[]) => number;
  /** Returns the radius value in radians for a given Datum, with 0 at the center. */
  radius?: (datum: Datum, index: number, data: Datum[]) => number;
};

export default function LineRadial<Datum>({
  className,
  angle,
  radius,
  defined,
  curve,
  data = [],
  innerRef,
  children,
  fill = 'transparent',
  ...restProps
}: LineRadialProps<Datum> & Omit<React.SVGProps<SVGPathElement>, keyof LineRadialProps<Datum>>) {
  const path = radialLine<Datum>();
  if (angle) path.angle(angle);
  if (radius) path.radius(radius);
  if (defined) path.defined(defined);
  if (curve) path.curve(curve);
  if (children) return <>{children({ path })}</>;
  return (
    <path
      ref={innerRef}
      className={cx('vx-line-radial', className)}
      d={path(data) || ''}
      fill={fill}
      {...restProps}
    />
  );
}
