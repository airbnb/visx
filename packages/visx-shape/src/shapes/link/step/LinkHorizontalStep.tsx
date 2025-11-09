import cx from 'classnames';
import { path as d3Path } from '@visx/vendor/d3-path';
import type { SharedLinkProps, AccessorProps, AddSVGProps } from '../../../types';
import { getX, getY, getSource, getTarget } from '../../../util/accessors';

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
  x = getY, // note this returns a y value
  y = getX, // note this returns a x value
  source = getSource,
  target = getTarget,
  children,
  ...restProps
}: AddSVGProps<LinkHorizontalStepProps<Link, Node>, SVGPathElement>) {
  const pathGen = path || pathHorizontalStep({ source, target, x, y, percent });
  if (children) return <>{children({ path: pathGen })}</>;
  return (
    <path
      ref={innerRef}
      className={cx('visx-link visx-link-horizontal-step', className)}
      d={pathGen(data) || ''}
      {...restProps}
    />
  );
}
