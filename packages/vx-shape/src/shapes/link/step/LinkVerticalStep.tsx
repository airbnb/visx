import React from 'react';
import cx from 'classnames';
import { path as d3Path } from 'd3-path';
import { SharedLinkProps, AccessorProps, $TSFIXME } from '../../../types';

export function pathVerticalStep<Link, Node>({
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

    const path = d3Path();
    path.moveTo(sx, sy);
    path.lineTo(sx, sy + (ty - sy) * percent);
    path.lineTo(tx, sy + (ty - sy) * percent);
    path.lineTo(tx, ty);

    return path.toString();
  };
}

type LinkVerticalStepProps<Link, Node> = {
  percent?: number;
} & AccessorProps<Link, Node> &
  SharedLinkProps<Link>;

export default function LinkVerticalStep<Link, Node>({
  className,
  innerRef,
  data,
  path,
  percent = 0.5,
  x = (d: $TSFIXME) => d.x,
  y = (d: $TSFIXME) => d.y,
  source = (d: $TSFIXME) => d.source,
  target = (d: $TSFIXME) => d.target,
  children,
  ...restProps
}: LinkVerticalStepProps<Link, Node> &
  Omit<React.SVGProps<SVGPathElement>, keyof LinkVerticalStepProps<Link, Node>>) {
  const pathGen = path || pathVerticalStep({ source, target, x, y, percent });
  if (children) return <>{children({ path: pathGen })}</>;
  return (
    <path
      ref={innerRef}
      className={cx('vx-link vx-link-vertical-step', className)}
      d={pathGen(data) || ''}
      {...restProps}
    />
  );
}
