import type { ReactNode, SVGProps } from 'react';
import cx from 'classnames';

export type PolygonProps = {
  /** Override render function which is provided polygon and generated path. */
  children?: ({ path, polygon }: { path: string; polygon: [number, number][] }) => ReactNode;
  /** className to apply to path element. */
  className?: string;
  /** Array of coordinate arrays for the polygon (e.g., [[x,y], [x1,y1], ...]), used to generate polygon path. */
  polygon?: [number, number][];
};

export default function Polygon({
  polygon,
  className,
  children,
  ...restProps
}: PolygonProps & Omit<SVGProps<SVGPathElement>, keyof PolygonProps>) {
  if (!polygon) return null;
  const path = `M${polygon.join('L')}Z`;
  if (children) return <>{children({ path, polygon })}</>;

  return <path className={cx('visx-delaunay-polygon', className)} d={path} {...restProps} />;
}
