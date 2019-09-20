import React from 'react';
import cx from 'classnames';
import { linkRadial } from 'd3-shape';
import { SharedLinkProps, RadialAccessorProps } from '../types';

export function pathRadialDiagonal<Link, Node>({
  source,
  target,
  angle,
  radius,
}: Required<RadialAccessorProps<Link, Node>>) {
  return (data: Link) => {
    const link = linkRadial<Link, Node>();
    link.angle(angle);
    link.radius(radius);
    link.source(source);
    link.target(target);
    return link(data);
  };
}

type LinkRadialDiagonalProps<Node, Link> = {
  angle: (node: Node) => number;
  radius: (node: Node) => number;
} & RadialAccessorProps<Node, Link> &
  SharedLinkProps<Link>;

export default function LinkRadialDiagonal<Link, Node>({
  className,
  children,
  data,
  innerRef,
  path,
  angle = (n: any) => n.x,
  radius = (n: any) => n.y,
  source = (n: any) => n.source,
  target = (n: any) => n.target,
  ...restProps
}: LinkRadialDiagonalProps<Node, Link>) {
  const pathGen = path || pathRadialDiagonal({ source, target, angle, radius });
  if (children) return <>{children({ path })}</>;
  return (
    <path
      ref={innerRef}
      className={cx('vx-link vx-link-radial-diagonal', className)}
      d={pathGen(data)}
      {...restProps}
    />
  );
}
