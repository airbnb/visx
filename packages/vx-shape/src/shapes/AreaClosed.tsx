import React from 'react';
import cx from 'classnames';
import { area } from 'd3-shape';
import { AreaProps } from './Area';
import { ScaleType } from '../types';

export type AreaClosedProps<Datum> = {
  yScale: ScaleType;
} & Pick<
  AreaProps<Datum>,
  | 'className'
  | 'innerRef'
  | 'children'
  | 'curve'
  | 'defined'
  | 'data'
  | 'x'
  | 'x0'
  | 'x1'
  | 'y'
  | 'y0'
  | 'y1'
>;

export default function AreaClosed<Datum>({
  x,
  x0,
  x1,
  y,
  y1,
  y0,
  yScale,
  data = [],
  defined = () => true,
  className,
  curve,
  innerRef,
  children,
  ...restProps
}: AreaClosedProps<Datum> & Omit<React.SVGProps<SVGPathElement>, keyof AreaClosedProps<Datum>>) {
  const path = area<Datum>();
  if (x) path.x(x);
  if (x0) path.x0(x0);
  if (x1) path.x1(x1);
  if (y0) {
    path.y0(y0);
  } else {
    /**
     * by default set the baseline to the first element of the yRange
     * @TODO take the minimum instead?
     */
    path.y0(yScale.range()[0]);
  }
  if (y && !y1) path.y1(y);
  if (y1 && !y) path.y1(y1);
  if (defined) path.defined(defined);
  if (curve) path.curve(curve);
  if (children) return <>{children({ path })}</>;
  return (
    <path
      ref={innerRef}
      className={cx('vx-area-closed', className)}
      d={path(data) || ''}
      {...restProps}
    />
  );
}
