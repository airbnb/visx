import React from 'react';
import cx from 'classnames';
import { path as d3Path } from 'd3-path';
import { SharedLinkProps, AccessorProps, $TSFIXME } from '../../../types';

export function pathHorizontalLine<Link, Node>({
  source,
  target,
  x,
  y,
}: Required<AccessorProps<Link, Node>>) {
  return (data: Link) => {
    const sourceData = source(data);
    const targetData = target(data);

    const sx = x(sourceData);
    const sy = y(sourceData);
    const tx = x(targetData);
    const ty = y(targetData);

    const path = d3Path();
    path.moveTo(sx, sy);
    path.lineTo(tx, ty);

    return path.toString();
  };
}

export type LinkHorizontalLineProps<Link, Node> = AccessorProps<Link, Node> & SharedLinkProps<Link>;

export default function LinkHorizontalLine<Link, Node>({
  className,
  children,
  innerRef,
  data,
  path,
  x = (d: $TSFIXME) => d.y, // note this returns a y value
  y = (d: $TSFIXME) => d.x, // note this returns a y value
  source = (d: $TSFIXME) => d.source,
  target = (d: $TSFIXME) => d.target,
  ...restProps
}: LinkHorizontalLineProps<Link, Node> &
  Omit<React.SVGProps<SVGPathElement>, keyof LinkHorizontalLineProps<Link, Node>>) {
  const pathGen = path || pathHorizontalLine({ source, target, x, y });
  if (children) return <>{children({ path: pathGen })}</>;
  return (
    <path
      ref={innerRef}
      className={cx('vx-link vx-link-horizontal-line', className)}
      d={pathGen(data) || ''}
      {...restProps}
    />
  );
}
