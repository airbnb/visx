import cx from 'classnames';
import { path as d3Path } from '@visx/vendor/d3-path';
import type { SharedLinkProps, AccessorProps, AddSVGProps } from '../../../types';
import { getX, getY, getSource, getTarget } from '../../../util/accessors';

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
  x = getX,
  y = getY,
  source = getSource,
  target = getTarget,
  children,
  ...restProps
}: AddSVGProps<LinkVerticalStepProps<Link, Node>, SVGPathElement>) {
  const pathGen = path || pathVerticalStep({ source, target, x, y, percent });
  if (children) return <>{children({ path: pathGen })}</>;
  return (
    <path
      ref={innerRef}
      className={cx('visx-link visx-link-vertical-step', className)}
      d={pathGen(data) || ''}
      {...restProps}
    />
  );
}
