import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { radialLine } from 'd3-shape';

LineRadial.propTypes = {
  className: PropTypes.string,
  data: PropTypes.any,
  curve: PropTypes.func,
  angle: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  radius: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
};

export default function LineRadial({
  className,
  angle,
  radius,
  defined,
  curve,
  data,
  innerRef,
  children,
  fill = 'transparent',
  ...restProps
}) {
  const path = radialLine();
  if (angle) path.angle(angle);
  if (radius) path.radius(radius);
  if (defined) path.defined(defined);
  if (curve) path.curve(curve);
  if (typeof children === 'function') return children({ path });
  return (
    <path
      ref={innerRef}
      className={cx('vx-line-radial', className)}
      d={path(data)}
      fill={fill}
      {...restProps}
    />
  );
}
