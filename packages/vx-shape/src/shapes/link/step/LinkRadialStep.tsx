import React from 'react';
import cx from 'classnames';
import { SharedLinkProps, AccessorProps, $TSFIXME } from '../../../types';

export function pathRadialStep<Link, Node>({
  source,
  target,
  x,
  y,
}: Required<AccessorProps<Link, Node>>) {
  return (link: Link) => {
    const sourceData = source(link);
    const targetData = target(link);

    const sx = x(sourceData);
    const sy = y(sourceData);
    const tx = x(targetData);
    const ty = y(targetData);

    const sa = sx - Math.PI / 2;
    const sr = sy;
    const ta = tx - Math.PI / 2;
    const tr = ty;

    const sc = Math.cos(sa);
    const ss = Math.sin(sa);
    const tc = Math.cos(ta);
    const ts = Math.sin(ta);
    const sf = Math.abs(ta - sa) > Math.PI ? ta <= sa : ta > sa;

    return `
      M${sr * sc},${sr * ss}
      A${sr},${sr},0,0,${sf ? 1 : 0},${sr * tc},${sr * ts}
      L${tr * tc},${tr * ts}
    `;
  };
}

type LinkRadialStepProps<Link, Node> = {
  percent?: number;
} & AccessorProps<Link, Node> &
  SharedLinkProps<Link>;

export default function LinkRadialStep<Link, Node>({
  className,
  innerRef,
  data,
  path,
  x = (d: $TSFIXME) => d.x,
  y = (d: $TSFIXME) => d.y,
  source = (d: $TSFIXME) => d.source,
  target = (d: $TSFIXME) => d.target,
  children,
  ...restProps
}: LinkRadialStepProps<Link, Node> &
  Omit<React.SVGProps<SVGPathElement>, keyof LinkRadialStepProps<Link, Node>>) {
  const pathGen = path || pathRadialStep({ source, target, x, y });
  if (children) return <>{children({ path: pathGen })}</>;
  return (
    <path
      ref={innerRef}
      className={cx('vx-link vx-link-radial-step', className)}
      d={pathGen(data) || ''}
      {...restProps}
    />
  );
}
