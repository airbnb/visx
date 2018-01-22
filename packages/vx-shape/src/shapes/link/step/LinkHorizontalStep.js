import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { path as d3Path } from 'd3-path';
import additionalProps from '../../../util/additionalProps';

LinkHorizontalStep.propTypes = {
  innerRef: PropTypes.func,
  percent: PropTypes.number
};

export default function LinkHorizontalStep({
  className,
  innerRef,
  data,
  percent = 0.5,
  x = d => d.y,
  y = d => d.x,
  source = d => d.source,
  target = d => d.target,
  ...restProps
}) {
  const link = (data) => {
    const sourceData = source(data);
    const targetData = target(data);

    const sx = x(sourceData);
    const sy = y(sourceData);
    const tx = x(targetData);
    const ty = y(targetData);

    const path =  d3Path();
    path.moveTo(sx, sy)
    path.lineTo(sx + (tx - sx) * percent, sy)
    path.lineTo(sx + (tx - sx) * percent, ty)
    path.lineTo(tx, ty)

    return path.toString();
  };

  return (
    <path
      ref={innerRef}
      className={cx('vx-link', className)}
      d={link(data)}
      {...restProps}
    />
  );
}