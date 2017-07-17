import React from 'react';
import cx from 'classnames';
import { line } from 'd3-shape';
import { curveLinear } from '@vx/curve';
import additionalProps from '../util/additionalProps';

function defaultDefined() {
  return true;
}

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
  const path = line();
  if (xScale) path.x(d => xScale(x(d)));
  if (yScale) path.y(d => yScale(y(d)));
  path.defined(defined || defaultDefined);
  path.curve(curve);
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
