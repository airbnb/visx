import React from 'react';
import cx from 'classnames';
import { PositionScale, AddSVGProps, BaseAreaProps } from '../types';
import setNumOrAccessor from '../util/setNumberOrNumberAccessor';
import { area } from '../util/D3ShapeFactories';

export type AreaClosedProps<Datum> = BaseAreaProps<Datum> & {
  yScale: PositionScale;
};

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
}: AddSVGProps<AreaClosedProps<Datum>, SVGPathElement>) {
  const path = area<Datum>({ x, x0, x1, defined, curve });
  if (y0 == null) {
    /**
     * by default set the baseline to the first element of the yRange
     * @TODO take the minimum instead?
     */
    path.y0(yScale.range()[0]);
  } else {
    setNumOrAccessor(path.y0, y0);
  }
  if (y && !y1) setNumOrAccessor(path.y1, y);
  if (y1 && !y) setNumOrAccessor(path.y1, y1);
  if (children) return <>{children({ path })}</>;
  return (
    <path
      ref={innerRef}
      className={cx('visx-area-closed', className)}
      d={path(data) || ''}
      {...restProps}
    />
  );
}
