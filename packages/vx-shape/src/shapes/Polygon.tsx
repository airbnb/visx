import React from 'react';
import cx from 'classnames';
import { degreesToRadians } from '../util/trigonometry';

const DEFAULT_CENTER = { x: 0, y: 0 };

export const getPoint = ({
  sides,
  size,
  center = DEFAULT_CENTER,
  rotate = 0,
  side,
}: { side: number } & Pick<PolygonProps, 'sides' | 'size' | 'center' | 'rotate'>) => {
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
}: Pick<PolygonProps, 'sides' | 'size' | 'center' | 'rotate'>) =>
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
  sides: number;
  /** Size of the shape. */
  size: number;
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
  sides,
  size = 25,
  center = DEFAULT_CENTER,
  rotate = 0,
  className,
  children,
  innerRef,
  ...restProps
}: PolygonProps & Omit<React.SVGProps<SVGPolygonElement>, keyof PolygonProps>) {
  const points: [number, number][] = getPoints({
    sides,
    size,
    center,
    rotate,
  }).map(({ x, y }) => [x, y]);

  if (children) return <>{children({ points })}</>;

  return (
    <polygon
      ref={innerRef}
      className={cx('vx-polygon', className)}
      points={points.join(' ')}
      {...restProps}
    />
  );
}
