import React from 'react';
import cx from 'classnames';
import { area } from 'd3-shape';
import setNumOrAccessor from '../util/setNumberOrNumberAccessor';
import { AddSVGProps } from '../types';
import { BaseAreaProps } from '../types/area';

export type AreaProps<Datum> = BaseAreaProps<Datum>;

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
}: AddSVGProps<AreaProps<Datum>, SVGPathElement>) {
  const path = area<Datum>();
  if (x) setNumOrAccessor(path.x, x);
  if (x0) setNumOrAccessor(path.x0, x0);
  if (x1) setNumOrAccessor(path.x1, x1);
  if (y) setNumOrAccessor(path.y, y);
  if (y0) setNumOrAccessor(path.y0, y0);
  if (y1) setNumOrAccessor(path.y1, y1);
  if (defined) path.defined(defined);
  if (curve) path.curve(curve);
  if (children) return <>{children({ path })}</>;
  return (
    <path ref={innerRef} className={cx('vx-area', className)} d={path(data) || ''} {...restProps} />
  );
}
