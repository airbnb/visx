import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { area } from 'd3-shape';

Area.propTypes = {
  children: PropTypes.func,
  className: PropTypes.string,
  data: PropTypes.any,
  defined: PropTypes.func,
  curve: PropTypes.func,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  x: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  x0: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  x1: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  y: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  y0: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  y1: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
};

export default function Area({
  children,
  x,
  x0,
  x1,
  y,
  y0,
  y1,
  data,
  defined = () => true,
  className,
  curve,
  innerRef,
  ...restProps
}) {
  const path = area();
  if (x) path.x(x);
  if (x0) path.x0(x0);
  if (x1) path.x1(x1);
  if (y) path.y(y);
  if (y0) path.y0(y0);
  if (y1) path.y1(y1);
  if (defined) path.defined(defined);
  if (curve) path.curve(curve);
  if (children) return children({ path });
  return (
    <g>
      <path ref={innerRef} className={cx('vx-area', className)} d={path(data)} {...restProps} />
    </g>
  );
}
