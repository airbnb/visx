import React from 'react';
import cx from 'classnames';
import { degreesToRadians } from '../util/trigonometry';
import { AddSVGProps } from '../types';

const DEFAULT_CENTER = { x: 0, y: 0 };

export const getPoint = ({
  sides = 4,
  size = 25,
  center = DEFAULT_CENTER,
  rotate = 0,
  side,
}: { side: number } & NonNullable<Pick<PolygonProps, 'sides' | 'size' | 'center' | 'rotate'>>) => {
  const degrees = (360 / sides) * side - rotate;
  const radians = degreesToRadians(degrees);

  return {
    x: center.x + size * Math.cos(radians),
    y: center.y + size * Math.sin(radians),
  };
};

export const getPoints = ({
  sides,
  size,
  center,
  rotate,
}: NonNullable<Pick<PolygonProps, 'sides' | 'size' | 'center' | 'rotate'>>) =>
  new Array(sides).fill(0).map((_, side) =>
    getPoint({
      sides,
      size,
      center,
      rotate,
      side,
    }),
  );

export type PolygonProps = {
  /** Number of polygon sides. */
  sides?: number;
  /** Size of the shape. */
  size?: number;
  /** Points to use to render the polygon. If this is defined, `sides`, `size`, `rotate`, and `center` are ignored. */
  points?: [number, number][];
  /** className to apply to polygon element. */
  className?: string;
  /** Rotation transform to apply to polygon. */
  rotate?: number;
  /** Render function override which is passed the generated polygon points. */
  children?: (args: { points: [number, number][] }) => React.ReactNode;
  /** Reference to polygon element. */
  innerRef?: React.Ref<SVGPolygonElement>;
  /** Polygon center position. */
  center?: {
    x: number;
    y: number;
  };
};

export default function Polygon({
  sides = 4,
  size = 25,
  center = DEFAULT_CENTER,
  rotate = 0,
  className,
  children,
  innerRef,
  points,
  ...restProps
}: AddSVGProps<PolygonProps, SVGPolygonElement>) {
  const pointsToRender: [number, number][] =
    points ||
    getPoints({
      sides,
      size,
      center,
      rotate,
    }).map(({ x, y }) => [x, y]);

  if (children) return <>{children({ points: pointsToRender })}</>;

  return (
    <polygon
      ref={innerRef}
      className={cx('visx-polygon', className)}
      points={pointsToRender.join(' ')}
      {...restProps}
    />
  );
}
