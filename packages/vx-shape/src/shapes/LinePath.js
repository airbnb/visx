import { curveLinear } from '@vx/curve';
import cx from 'classnames';
import { line } from 'd3-shape';
import PropTypes from 'prop-types';
import React from 'react';
import additionalProps from '../util/additionalProps';

LinePath.propTypes = {
  innerRef: PropTypes.func,
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  data: PropTypes.array,
  x: PropTypes.func,
  y: PropTypes.func,
  defined: PropTypes.func,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  glyph: PropTypes.func,
  curve: PropTypes.func
};

export default function LinePath({
  children,
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
  const path = line()
    .x((...args) => xScale(x(...args)))
    .y((...args) => yScale(y(...args)))
    .defined(defined)
    .curve(curve);
  if (children) return children({ path });
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
      {glyph && <g className="vx-linepath-glyphs">{data.map(glyph)}</g>}
    </g>
  );
}
