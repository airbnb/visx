import React from 'react';
import cx from 'classnames';
import { linkHorizontal } from 'd3-shape';
import { SharedLinkProps, AccessorProps, $TSFIXME } from '../../../types';

export function pathHorizontalDiagonal<Link, Node>({
  source,
  target,
  x,
  y,
}: Required<AccessorProps<Link, Node>>) {
  return (data: Link) => {
    const link = linkHorizontal<Link, Node>();
    link.x(x);
    link.y(y);
    link.source(source);
    link.target(target);
    return link(data);
  };
}

export type LinkHorizontalDiagonalProps<Link, Node> = AccessorProps<Link, Node> &
  SharedLinkProps<Link>;

export default function LinkHorizontalDiagonal<Link, Node>({
  className,
  children,
  data,
  innerRef,
  path,
  x = (n: $TSFIXME) => n && n.y, // note this returns a y value
  y = (n: $TSFIXME) => n && n.x, // note this returns an x value
  source = (l: $TSFIXME) => l && l.source,
  target = (l: $TSFIXME) => l && l.target,
  ...restProps
}: LinkHorizontalDiagonalProps<Link, Node> &
  Omit<React.SVGProps<SVGPathElement>, keyof LinkHorizontalDiagonalProps<Link, Node>>) {
  const pathGen = path || pathHorizontalDiagonal({ source, target, x, y });
  if (children) return <>{children({ path: pathGen })}</>;
  return (
    <path
      ref={innerRef}
      className={cx('vx-link vx-link-horizontal-diagonal', className)}
      d={pathGen(data) || ''}
      {...restProps}
    />
  );
}
