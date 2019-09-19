import React from 'react';
import cx from 'classnames';
import { Point } from '@vx/point';
import { degreesToRadians } from '../util/trigonometry';

export const getPoint = ({
  sides,
  size,
  center,
  rotate,
  side,
}: // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMe'.
$TSFixMe) => {
  const degrees = (360 / sides) * side - rotate;
  const radians = degreesToRadians(degrees);

  return new Point({
    x: center.x + size * Math.cos(radians),
    y: center.y + size * Math.sin(radians),
  });
};

export const getPoints = ({
  sides,
  size,
  center,
  rotate,
}: // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMe'.
$TSFixMe) =>
  new Array(sides).fill(0).map((_, side) =>
    getPoint({
      sides,
      size,
      center,
      rotate,
      side,
    }),
  );

type Props = {
  sides: number;
  size: number;
  className?: string;
  rotate?: number;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  children?: $TSFixMeFunction;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  innerRef?: $TSFixMeFunction | $TSFixMe;
  center?: {
    x?: number;
    y?: number;
  };
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
}: Props) {
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
