import cx from 'classnames';
import { path as d3Path } from '@visx/vendor/d3-path';
import type { SharedLinkProps, AccessorProps, AddSVGProps } from '../../../types';
import { getY, getX, getSource, getTarget } from '../../../util/accessors';

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
  x = getY, // note this returns a y value
  y = getX, // note this returns a x value
  source = getSource,
  target = getTarget,
  ...restProps
}: AddSVGProps<LinkHorizontalLineProps<Link, Node>, SVGPathElement>) {
  const pathGen = path || pathHorizontalLine({ source, target, x, y });
  if (children) return <>{children({ path: pathGen })}</>;
  return (
    <path
      ref={innerRef}
      className={cx('visx-link visx-link-horizontal-line', className)}
      d={pathGen(data) || ''}
      {...restProps}
    />
  );
}
