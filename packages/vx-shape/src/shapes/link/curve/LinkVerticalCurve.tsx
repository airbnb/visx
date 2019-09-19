import React from 'react';
import cx from 'classnames';
import { path as d3Path } from 'd3-path';

export function pathVerticalCurve({
  source,
  target,
  x,
  y,
  percent,
}: // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMe'.
$TSFixMe) {
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMe'.
  return (data: $TSFixMe) => {
    const sourceData = source(data);
    const targetData = target(data);

    const sx = x(sourceData);
    const sy = y(sourceData);
    const tx = x(targetData);
    const ty = y(targetData);

    const dx = tx - sx;
    const dy = ty - sy;
    const ix = percent * (dx + dy);
    const iy = percent * (dy - dx);

    const path = d3Path();
    path.moveTo(sx, sy);
    path.bezierCurveTo(sx + ix, sy + iy, tx + iy, ty - ix, tx, ty);

    return path.toString();
  };
}

type Props = {
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  innerRef?: $TSFixMeFunction | $TSFixMe;
  percent?: number;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  x?: $TSFixMeFunction;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  y?: $TSFixMeFunction;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  source?: $TSFixMeFunction;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  target?: $TSFixMeFunction;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  path?: $TSFixMeFunction;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMeFunction'.
  children?: $TSFixMeFunction;
  // @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMe'.
  data?: $TSFixMe;
  className?: string;
};

// @ts-ignore ts-migrate(2304) FIXME: Cannot find name '$TSFixMe'.
export default function LinkVerticalCurve({
  className,
  innerRef,
  data,
  path,
  x = (d: $TSFixMe) => d.x,
  y = (d: $TSFixMe) => d.y,
  source = (d: $TSFixMe) => d.source,
  target = (d: $TSFixMe) => d.target,
  percent = 0.2,
  children,
  ...restProps
}: Props) {
  const pathGen = path || pathVerticalCurve({ source, target, x, y, percent });
  if (children) return children({ path });
  return (
    <path
      ref={innerRef}
      className={cx('vx-link vx-link-vertical-curve', className)}
      d={pathGen(data)}
      {...restProps}
    />
  );
}
