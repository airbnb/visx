import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { area } from 'd3-shape';
import additionalProps from '../util/additionalProps';

Area.propTypes = {
  x: PropTypes.func,
  x0: PropTypes.func,
  x1: PropTypes.func,
  y: PropTypes.func,
  y0: PropTypes.func,
  y1: PropTypes.func,
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  data: PropTypes.array,
  defined: PropTypes.func,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.object,
    PropTypes.array
  ]),
  innerRef: PropTypes.func,
  strokeDasharray: PropTypes.string,
  strokeWidth: PropTypes.number,
  stroke: PropTypes.string,
  fill: PropTypes.string,
  curve: PropTypes.func
};

export default function Area({
  children,
  x,
  x0,
  x1,
  y,
  y0,
  y1,
  xScale,
  yScale,
  data = [],
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
  const path = area();
  if (x) path.x((...args) => xScale(x(...args)));
  if (x0) path.x0((...args) => xScale(x0(...args)));
  if (x1) path.x1((...args) => xScale(x1(...args)));
  if (y) path.y((...args) => yScale(y(...args)));
  if (y0) path.y0((...args) => yScale(y0(...args)));
  if (y1) path.y1((...args) => yScale(y1(...args)));
  if (defined) path.defined(defined);
  if (curve) path.curve(curve);
  if (children) return children({ path });
  return (
    <g>
      <path
        ref={innerRef}
        className={cx('vx-area', className)}
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
