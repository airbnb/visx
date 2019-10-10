import React from 'react';
import cx from 'classnames';
import { path as d3Path } from 'd3-path';
import { SharedLinkProps, AccessorProps, $TSFIXME } from '../../../types';

export function pathRadialCurve<Link, Node>({
  source,
  target,
  x,
  y,
  percent,
}: Required<AccessorProps<Link, Node>> & { percent: number }) {
  return (link: Link) => {
    const sourceData = source(link);
    const targetData = target(link);

    const sa = x(sourceData) - Math.PI / 2;
    const sr = y(sourceData);
    const ta = x(targetData) - Math.PI / 2;
    const tr = y(targetData);

    const sc = Math.cos(sa);
    const ss = Math.sin(sa);
    const tc = Math.cos(ta);
    const ts = Math.sin(ta);

    const sx = sr * sc;
    const sy = sr * ss;
    const tx = tr * tc;
    const ty = tr * ts;

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

export type LinkRadialCurveProps<Link, Node> = {
  percent?: number;
} & AccessorProps<Link, Node> &
  SharedLinkProps<Link>;

export default function LinkRadialCurve<Link, Node>({
  className,
  children,
  data,
  innerRef,
  path,
  percent = 0.2,
  x = (n: $TSFIXME) => n && n.x,
  y = (n: $TSFIXME) => n && n.y,
  source = (l: $TSFIXME) => l && l.source,
  target = (l: $TSFIXME) => l && l.target,
  ...restProps
}: LinkRadialCurveProps<Link, Node> &
  Omit<React.SVGProps<SVGPathElement>, keyof LinkRadialCurveProps<Link, Node>>) {
  const pathGen = path || pathRadialCurve({ source, target, x, y, percent });
  if (children) return <>{children({ path: pathGen })}</>;
  return (
    <path
      ref={innerRef}
      className={cx('vx-link vx-link-radial-curve', className)}
      d={pathGen(data) || ''}
      {...restProps}
    />
  );
}
