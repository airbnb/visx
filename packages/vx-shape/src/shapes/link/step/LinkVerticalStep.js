import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { path as d3Path } from 'd3-path';
import additionalProps from '../../../util/additionalProps';

LinkVerticalStep.propTypes = {
  innerRef: PropTypes.func,
  percent: PropTypes.number,
};

export default function LinkVerticalStep({
  className,
  innerRef,
  data,
  percent = 0.5,
  x = d => d.x,
  y = d => d.y,
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
    path.lineTo(sx, sy + (ty - sy) * percent)
    path.lineTo(tx, sy + (ty - sy) * percent)
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
