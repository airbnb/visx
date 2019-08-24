import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Point } from '@vx/point';
import { degreesToRadians } from '../util/trigonometry';

Polygon.propTypes = {
  sides: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  className: PropTypes.string,
  rotate: PropTypes.number,
  children: PropTypes.func,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  center: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
};

export const getPoint = ({ sides, size, center, rotate, side }) => {
  const degrees = (360 / sides) * side - rotate;
  const radians = degreesToRadians(degrees);

  return new Point({
    x: center.x + size * Math.cos(radians),
    y: center.y + size * Math.sin(radians),
  });
};

export const getPoints = ({ sides, size, center, rotate }) => {
  return [...Array(sides).keys()].map(side => {
    return getPoint({
      sides,
      size,
      center,
      rotate,
      side,
    });
  });
};

export default function Polygon({
  sides,
  size = 25,
  center = new Point({ x: 0, y: 0 }),
  rotate = 0,
  className,
  children,
  innerRef,
  ...restProps
}) {
  const points = getPoints({
    sides,
    size,
    center,
    rotate,
  }).map(p => p.toArray());

  if (children) return children({ points });

  return (
    <polygon
      ref={innerRef}
      className={cx('vx-polygon', className)}
      points={points.join(' ')}
      {...restProps}
    />
  );
}
