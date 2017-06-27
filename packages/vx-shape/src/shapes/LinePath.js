import React from 'react';
import cx from 'classnames';
import { line } from 'd3-shape';
import { curveLinear } from '@vx/curve';
import additionalProps from '../util/additionalProps';

export default function LinePath({
  data,
  xScale,
  yScale,
  x,
  y,
  defined,
  className,
  stroke = 'steelblue',
  strokeWidth = 2,
  strokeDasharray = '',
  strokeDashoffset = 0,
  fill = 'none',
  curve = curveLinear,
  glyph,
  ...restProps
}) {
  const path = line()
    .x(d => xScale(x(d)))
    .y(d => yScale(y(d)))
    .defined(defined || (d => y(d) && x(d)))
    .curve(curve);
  return (
    <g>
      <path
        className={cx('vx-linepath', className)}
        d={path(data)}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
        fill={fill}
        {...additionalProps(restProps, data)}
      />
      {glyph &&
        <g className="vx-linepath-glyphs">
          {data.map(glyph)}
        </g>}
    </g>
  );
}
