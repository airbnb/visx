import React from 'react';
import cx from 'classnames';
import Point from '@vx/point';

export default function Line({
  from = new Point({ x: 0, y: 0 }),
  to = [1,1],
  stroke = {
    color: '#000',
    width: 1,
    dasharray: '',
  },
  transform = '',
  className = '',
}) {
  return (
    <line
      className={cx('vx-line', className)}
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      stroke={stroke.color}
      strokeWidth={stroke.width}
      strokeDasharray={stroke.dasharray}
    />
  );
}
