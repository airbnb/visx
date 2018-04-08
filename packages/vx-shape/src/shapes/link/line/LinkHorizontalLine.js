import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { path as d3Path } from 'd3-path';
import additionalProps from '../../../util/additionalProps';

export function pathHorizontalLine({ source, target, x, y }) {
  return data => {
    const sourceData = source(data);
    const targetData = target(data);

    const sx = x(sourceData);
    const sy = y(sourceData);
    const tx = x(targetData);
    const ty = y(targetData);

    const path = d3Path();
    path.moveTo(sx, sy);
    path.lineTo(tx, ty);

    return path.toString();
  };
}

LinkHorizontalLine.propTypes = {
  innerRef: PropTypes.func,
  path: PropTypes.func,
  x: PropTypes.func,
  y: PropTypes.func,
  source: PropTypes.func,
  target: PropTypes.func
};

export default function LinkHorizontalLine({
  className,
  innerRef,
  data,
  path,
  x = d => d.y,
  y = d => d.x,
  source = d => d.source,
  target = d => d.target,
  ...restProps
}) {
  path = path || pathHorizontalLine({ source, target, x, y });
  return (
    <path
      ref={innerRef}
      className={cx('vx-link', className)}
      d={path(data)}
      {...additionalProps(restProps, data)}
    />
  );
}
