import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Point } from '@vx/point';

Line.propTypes = {
  className: PropTypes.string,
  innerRef: PropTypes.func,
  from: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
  to: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number })
};

export default function Line({
  from = new Point({ x: 0, y: 0 }),
  to = new Point({ x: 1, y: 1 }),
  fill = 'transparent',
  className = '',
  innerRef,
  ...restProps
}) {
  return (
    <line
      ref={innerRef}
      className={cx('vx-line', className)}
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      fill={fill}
      {...restProps}
    />
  );
}
