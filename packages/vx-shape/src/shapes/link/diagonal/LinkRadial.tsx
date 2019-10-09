import React from 'react';
import cx from 'classnames';
import { linkRadial } from 'd3-shape';
import { SharedLinkProps, RadialAccessorProps, $TSFIXME } from '../../../types';

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

type LinkRadialDiagonalProps<Link, Node> = {
  angle: (node: Node) => number;
  radius: (node: Node) => number;
} & RadialAccessorProps<Link, Node> &
  SharedLinkProps<Link>;

export default function LinkRadialDiagonal<Link, Node>({
  className,
  children,
  data,
  innerRef,
  path,
  angle = (n: $TSFIXME) => n.x,
  radius = (n: $TSFIXME) => n.y,
  source = (n: $TSFIXME) => n.source,
  target = (n: $TSFIXME) => n.target,
  ...restProps
}: LinkRadialDiagonalProps<Link, Node> &
  Omit<React.SVGProps<SVGPathElement>, keyof LinkRadialDiagonalProps<Link, Node>>) {
  const pathGen = path || pathRadialDiagonal({ source, target, angle, radius });
  if (children) return <>{children({ path: pathGen })}</>;
  return (
    <path
      ref={innerRef}
      className={cx('vx-link vx-link-radial-diagonal', className)}
      d={pathGen(data) || ''}
      {...restProps}
    />
  );
}
