import React from 'react';
import cx from 'classnames';
import { linkRadial } from 'd3-shape';

export function pathRadialDiagonal({
  source,
  target,
  angle,
  radius,
}: // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMe'.
$TSFixMe) {
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMe'.
  return (data: $TSFixMe) => {
    const link = linkRadial();
    link.angle(angle);
    link.radius(radius);
    link.source(source);
    link.target(target);
    return link(data);
  };
}

type Props = {
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  innerRef?: $TSFixMeFunction | $TSFixMe;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  angle?: $TSFixMeFunction;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  radius?: $TSFixMeFunction;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  source?: $TSFixMeFunction;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  target?: $TSFixMeFunction;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  path?: $TSFixMeFunction;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  children?: $TSFixMeFunction;
  className?: string;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMe'.
  data?: $TSFixMe;
};

// @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMe'.
export default function LinkRadial({
  className,
  innerRef,
  data,
  path,
  angle = (d: $TSFixMe) => d.x,
  radius = (d: $TSFixMe) => d.y,
  source = (d: $TSFixMe) => d.source,
  target = (d: $TSFixMe) => d.target,
  children,
  ...restProps
}: Props) {
  const pathGen = path || pathRadialDiagonal({ source, target, angle, radius });
  if (children) return children({ path });
  return (
    <path
      ref={innerRef}
      className={cx('vx-link vx-link-radial-diagonal', className)}
      d={pathGen(data)}
      {...restProps}
    />
  );
}
