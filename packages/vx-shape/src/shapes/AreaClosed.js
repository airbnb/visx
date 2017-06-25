import React from 'react';
import cx from 'classnames';
import { area } from 'd3-shape';

export default function AreaClosed({
  x,
  y,
  xScale,
  yScale,
  data,
  defined,
  className,
  strokeDasharray,
  strokeWidth = 2,
  stroke = 'black',
  fill = rgba(0,0,0,0.3),
  curve,
  ...restProps,
}) {
  const path = area()
    .x(d => xScale(x(d)))
    .y0(yScale.range()[0])
    .y1(d => yScale(y(d)))
    .defined(defined || (d => y(d) && x(d)));
  if (curve) path.curve(curve);
  return (
    <g>
      <path
        className={cx('vx-area-closed', className)}
        d={path(data)}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        fill={fill}
        {...restProps}
      />
    </g>
  );
}
