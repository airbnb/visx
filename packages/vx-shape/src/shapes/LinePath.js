import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { line } from 'd3-shape';

LinePath.propTypes = {
  innerRef: PropTypes.func,
  data: PropTypes.array,
  curve: PropTypes.func,
  defined: PropTypes.oneOf([PropTypes.func, PropTypes.bool]),
  x: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  y: PropTypes.oneOfType([PropTypes.func, PropTypes.number])
};

export default function LinePath({
  children,
  data,
  x,
  y,
  className,
  curve,
  innerRef,
  defined = () => true,
  ...restProps
}) {
  const path = line();
  if (x) path.x(x);
  if (y) path.y(y);
  if (defined) path.defined(defined);
  if (curve) path.curve(curve);
  if (children) return children({ path });
  return (
    <path ref={innerRef} className={cx('vx-linepath', className)} d={path(data)} {...restProps} />
  );
}
