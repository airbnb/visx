import React from 'react';
import cx from 'classnames';
import { path as d3Path } from 'd3-path';
import { SharedLinkProps, AccessorProps } from '../types';

export function pathHorizontalStep<Link, Node>({
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
    path.lineTo(sx + (tx - sx) * percent, sy);
    path.lineTo(sx + (tx - sx) * percent, ty);
    path.lineTo(tx, ty);

    return path.toString();
  };
}

type LinkHorizontalStepProps<Link, Node> = {
  percent?: number;
} & AccessorProps<Link, Node> &
  SharedLinkProps<Link>;

export default function LinkHorizontalStep<Link, Node>({
  className,
  innerRef,
  data,
  path,
  percent = 0.5,
  x = (d: any) => d.y,
  y = (d: any) => d.x,
  source = (d: any) => d.source,
  target = (d: any) => d.target,
  children,
  ...restProps
}: LinkHorizontalStepProps<Link, Node>) {
  const pathGen = path || pathHorizontalStep({ source, target, x, y, percent });
  if (children) return children({ path });
  return (
    <path
      ref={innerRef}
      className={cx('vx-link vx-link-horizontal-step', className)}
      d={pathGen(data)}
      {...restProps}
    />
  );
}
