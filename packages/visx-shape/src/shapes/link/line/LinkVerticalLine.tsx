import cx from 'classnames';
import { path as d3Path } from '@visx/vendor/d3-path';
import type { SharedLinkProps, AccessorProps, AddSVGProps } from '../../../types';
import { getX, getY, getSource, getTarget } from '../../../util/accessors';

export function pathVerticalLine<Link, Node>({
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

export type LinkVerticalLineProps<Link, Node> = AccessorProps<Link, Node> & SharedLinkProps<Link>;

export default function LinkVerticalLine<Link, Node>({
  className,
  innerRef,
  data,
  path,
  x = getX,
  y = getY,
  source = getSource,
  target = getTarget,
  children,
  ...restProps
}: AddSVGProps<LinkVerticalLineProps<Link, Node>, SVGPathElement>) {
  const pathGen = path || pathVerticalLine({ source, target, x, y });
  if (children) return <>{children({ path: pathGen })}</>;
  return (
    <path
      ref={innerRef}
      className={cx('visx-link visx-link-vertical-line', className)}
      d={pathGen(data) || ''}
      {...restProps}
    />
  );
}
