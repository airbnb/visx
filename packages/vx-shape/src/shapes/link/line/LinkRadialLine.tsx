import React from 'react';
import cx from 'classnames';
import { path as d3Path } from 'd3-path';

export function pathRadialLine({
  source,
  target,
  x,
  y,
}: // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMe'.
$TSFixMe) {
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMe'.
  return (data: $TSFixMe) => {
    const sourceData = source(data);
    const targetData = target(data);

    const sa = x(sourceData) - Math.PI / 2;
    const sr = y(sourceData);
    const ta = x(targetData) - Math.PI / 2;
    const tr = y(targetData);

    const sc = Math.cos(sa);
    const ss = Math.sin(sa);
    const tc = Math.cos(ta);
    const ts = Math.sin(ta);

    const path = d3Path();
    path.moveTo(sr * sc, sr * ss);
    path.lineTo(tr * tc, tr * ts);

    return path.toString();
  };
}

type Props = {
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  innerRef?: $TSFixMeFunction | $TSFixMe;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  path?: $TSFixMeFunction;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  x?: $TSFixMeFunction;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  y?: $TSFixMeFunction;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  source?: $TSFixMeFunction;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  target?: $TSFixMeFunction;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  children?: $TSFixMeFunction;
  className?: string;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMe'.
  data?: $TSFixMe;
};

// @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMe'.
export default function LinkRadialStep({
  className,
  innerRef,
  data,
  path,
  x = (d: $TSFixMe) => d.x,
  y = (d: $TSFixMe) => d.y,
  source = (d: $TSFixMe) => d.source,
  target = (d: $TSFixMe) => d.target,
  children,
  ...restProps
}: Props) {
  const pathGen = path || pathRadialLine({ source, target, x, y });
  if (children) return children({ path });
  return (
    <path
      ref={innerRef}
      className={cx('vx-link vx-link-radial-line', className)}
      d={pathGen(data)}
      {...restProps}
    />
  );
}
