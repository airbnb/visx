import React from 'react';
import cx from 'classnames';
import { linkVertical } from 'd3-shape';
import { SharedLinkProps, AccessorProps, $TSFIXME } from '../../../types';

export function pathVerticalDiagonal<Link, Node>({
  source,
  target,
  x,
  y,
}: Required<AccessorProps<Link, Node>>) {
  return (data: Link) => {
    const link = linkVertical<Link, Node>();
    link.x(x);
    link.y(y);
    link.source(source);
    link.target(target);
    return link(data);
  };
}

type LinkVerticalDiagonalProps<Link, Node> = AccessorProps<Link, Node> & SharedLinkProps<Link>;

export default function LinkVerticalDiagonal<Link, Node>({
  className,
  children,
  data,
  innerRef,
  path,
  x = (d: $TSFIXME) => d.x,
  y = (d: $TSFIXME) => d.y,
  source = (d: $TSFIXME) => d.source,
  target = (d: $TSFIXME) => d.target,
  ...restProps
}: LinkVerticalDiagonalProps<Link, Node> &
  Omit<React.SVGProps<SVGPathElement>, keyof LinkVerticalDiagonalProps<Link, Node>>) {
  const pathGen = path || pathVerticalDiagonal({ source, target, x, y });
  if (children) return <>{children({ path: pathGen })}</>;
  return (
    <path
      ref={innerRef}
      className={cx('vx-link vx-link-vertical-diagonal', className)}
      d={pathGen(data) || ''}
      {...restProps}
    />
  );
}
