import React from 'react';
import cx from 'classnames';
import setNumOrAccessor from '../util/setNumberOrNumberAccessor';
import { PositionScale, AddSVGProps } from '../types';
import { BaseAreaProps } from '../types/area';
import area from '../factories/areaPath';

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
  if (y0) {
    setNumOrAccessor(path.y0, y0);
  } else {
    /**
     * by default set the baseline to the first element of the yRange
     * @TODO take the minimum instead?
     */
    path.y0(yScale.range()[0]);
  }
  if (y && !y1) setNumOrAccessor(path.y1, y);
  if (y1 && !y) setNumOrAccessor(path.y1, y1);
  // eslint-disable-next-line react/jsx-no-useless-fragment
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
