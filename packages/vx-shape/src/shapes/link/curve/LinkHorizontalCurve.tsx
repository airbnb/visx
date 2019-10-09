import React from 'react';
import cx from 'classnames';
import { path as d3Path } from 'd3-path';
import { SharedLinkProps, AccessorProps, $TSFIXME } from '../../../types';

export function pathHorizontalCurve<Link, Node>({
  source,
  target,
  x,
  y,
  percent,
}: Required<AccessorProps<Link, Node>> & { percent: number }) {
  return (link: Link) => {
    const sourceData = source(link);
    const targetData = target(link);

    const sx = x(sourceData);
    const sy = y(sourceData);
    const tx = x(targetData);
    const ty = y(targetData);

    const dx = tx - sx;
    const dy = ty - sy;
    const ix = percent * (dx + dy);
    const iy = percent * (dy - dx);

    const path = d3Path();
    path.moveTo(sx, sy);
    path.bezierCurveTo(sx + ix, sy + iy, tx + iy, ty - ix, tx, ty);

    return path.toString();
  };
}

export type LinkHorizontalCurveProps<Link, Node> = AccessorProps<Link, Node> &
  SharedLinkProps<Link> & {
    percent?: number;
  };

export default function LinkHorizontalCurve<Link, Node>({
  className,
  children,
  data,
  innerRef,
  path,
  percent = 0.2,
  x = (n: $TSFIXME) => n && n.y, // note this returns a y value
  y = (n: $TSFIXME) => n && n.x, // note this returns an x value
  source = (l: $TSFIXME) => l && l.source,
  target = (l: $TSFIXME) => l && l.target,
  ...restProps
}: LinkHorizontalCurveProps<Link, Node> &
  Omit<React.SVGProps<SVGPathElement>, keyof LinkHorizontalCurveProps<Link, Node>>) {
  const pathGen = path || pathHorizontalCurve({ source, target, x, y, percent });
  if (children) return <>{children({ path: pathGen })}</>;
  return (
    <path
      ref={innerRef}
      className={cx('vx-link vx-link-horizontal-curve', className)}
      d={pathGen(data) || ''}
      {...restProps}
    />
  );
}
