import React from 'react';
import cx from 'classnames';
import { line } from 'd3-shape';
import Curve from '@vx/curve';

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
  fill = 'none',
  curve = Curve.linear,
  glyph,
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
        fill={fill}
      />
      {glyph &&
        <g className='vx-linepath-glyphs'>
          {data.map(glyph)}
        </g>
      }
    </g>
  );
}
