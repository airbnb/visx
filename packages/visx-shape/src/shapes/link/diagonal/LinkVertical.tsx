import cx from 'classnames';
import { linkVertical } from '@visx/vendor/d3-shape';
import type { SharedLinkProps, AccessorProps, AddSVGProps } from '../../../types';
import { getX, getY, getSource, getTarget } from '../../../util/accessors';

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
  x = getX,
  y = getY,
  source = getSource,
  target = getTarget,
  ...restProps
}: AddSVGProps<LinkVerticalDiagonalProps<Link, Node>, SVGPathElement>) {
  const pathGen = path || pathVerticalDiagonal({ source, target, x, y });
  if (children) return <>{children({ path: pathGen })}</>;
  return (
    <path
      ref={innerRef}
      className={cx('visx-link visx-link-vertical-diagonal', className)}
      d={pathGen(data) || ''}
      {...restProps}
    />
  );
}
