import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { area } from 'd3-shape';

AreaClosed.propTypes = {
  children: PropTypes.func,
  className: PropTypes.string,
  data: PropTypes.any,
  defined: PropTypes.func,
  innerRef: PropTypes.func,
  curve: PropTypes.func,
  yScale: PropTypes.func,
  x: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  x0: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  x1: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  y1: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  y0: PropTypes.oneOfType([PropTypes.func, PropTypes.number])
};

export default function AreaClosed({
  x,
  x0,
  x1,
  y1,
  y0,
  yScale,
  data,
  defined = () => true,
  className,
  curve,
  innerRef,
  children,
  ...restProps
}) {
  const path = area();
  if (x) path.x(x);
  if (x0) path.x0(x0);
  if (x1) path.x1(x1);
  if (y0) {
    path.y0(y0);
  } else {
    path.y0(yScale.range()[0]);
  }
  if (y1) path.y1(y1);
  if (defined) path.defined(defined);
  if (curve) path.curve(curve);
  if (children) return children({ path });
  return (
    <path
      ref={innerRef}
      className={cx('vx-area-closed', className)}
      d={path(data)}
      {...restProps}
    />
  );
}
