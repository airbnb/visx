import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { line } from 'd3-shape';
import { curveLinear } from '@vx/curve';
import additionalProps from '../util/additionalProps';

LinePath.propTypes = {
  innerRef: PropTypes.func,
};

export default function LinePath({
  data,
  xScale,
  yScale,
  x,
  y,
  defined = () => true,
  className,
  stroke = 'steelblue',
  strokeWidth = 2,
  strokeDasharray = '',
  strokeDashoffset = 0,
  fill = 'none',
  curve = curveLinear,
  glyph,
  innerRef,
  ...restProps
}) {
  const path = line();
  if (x) path.x(d => xScale(x(d)));
  if (y) path.y(d => yScale(y(d)));
  if (defined) path.defined(defined);
  if (curve) path.curve(curve);
  return (
    <g>
      <path
        ref={innerRef}
        className={cx('vx-linepath', className)}
        d={path(data)}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
        fill={fill}
        {...additionalProps(restProps, data)}
      />
      {glyph && (
        <g className="vx-linepath-glyphs">{data.map(glyph)}</g>
      )}
    </g>
  );
}
