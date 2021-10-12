import React from 'react';
import cx from 'classnames';
import { AddSVGProps, BaseAreaProps } from '../types';
import { area } from '../util/D3ShapeFactories';

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
  const path = area<Datum>({ x, x0, x1, y, y0, y1, defined, curve });
  if (children) return <>{children({ path })}</>;
  return (
    <path
      ref={innerRef}
      className={cx('visx-area', className)}
      d={path(data) || ''}
      {...restProps}
    />
  );
}
