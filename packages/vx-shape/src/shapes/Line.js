import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Point } from '@vx/point';
import additionalProps from '../util/additionalProps';

Line.propTypes = {
  innerRef: PropTypes.func,
};

export default function Line({
  from = new Point({ x: 0, y: 0 }),
  to = new Point({ x: 1, y: 1 }),
  stroke = 'black',
  strokeWidth = 1,
  strokeDasharray = '',
  transform = '',
  className = '',
  data,
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
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeDasharray={strokeDasharray}
      transform={transform}
      {...additionalProps(restProps, data)}
    />
  );
}
