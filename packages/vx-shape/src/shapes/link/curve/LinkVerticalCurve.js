import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { path as d3Path } from 'd3-path';
import additionalProps from '../../../util/additionalProps';

export function pathVerticalCurve({ source, target, x, y, percent }) {
  return data => {
    const sourceData = source(data);
    const targetData = target(data);

    const sx = x(sourceData);
    const sy = y(sourceData);
    const tx = x(targetData);
    const ty = y(targetData);

    const dx = tx - sx;
    const dy = ty - sy;
    const ix = percent * (dx + dy);
    const iy = percent * (dy - dx);

    const path = d3Path();
    path.moveTo(sx, sy);
    path.bezierCurveTo(sx + ix, sy + iy, tx + iy, ty - ix, tx, ty);

    return path.toString();
  };
}

LinkVerticalCurve.propTypes = {
  innerRef: PropTypes.func,
  percent: PropTypes.number,
  x: PropTypes.func,
  y: PropTypes.func,
  source: PropTypes.func,
  target: PropTypes.func,
  path: PropTypes.func
};

export default function LinkVerticalCurve({
  className,
  innerRef,
  data,
  path,
  x = d => d.x,
  y = d => d.y,
  source = d => d.source,
  target = d => d.target,
  percent = 0.2,
  ...restProps
}) {
  path = path || pathVerticalCurve({ source, target, x, y, percent });
  return (
    <path
      ref={innerRef}
      className={cx('vx-link', className)}
      d={path(data)}
      {...additionalProps(restProps, data)}
    />
  );
}
