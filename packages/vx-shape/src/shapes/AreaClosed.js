import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { area } from 'd3-shape';
import additionalProps from '../util/additionalProps';

AreaClosed.propTypes = {
  innerRef: PropTypes.func
};

export default function AreaClosed({
  x,
  y,
  xScale,
  yScale,
  data,
  defined = () => true,
  className,
  strokeDasharray,
  strokeWidth = 2,
  stroke = 'black',
  fill = 'rgba(0,0,0,0.3)',
  curve,
  innerRef,
  ...restProps
}) {
  const path = area()
    .x(d => xScale(x(d)))
    .y0(yScale.range()[0])
    .y1(d => yScale(y(d)))
    .defined(defined);
  if (curve) path.curve(curve);
  return (
    <g>
      <path
        ref={innerRef}
        className={cx('vx-area-closed', className)}
        d={path(data)}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        fill={fill}
        {...additionalProps(restProps, data)}
      />
    </g>
  );
}
