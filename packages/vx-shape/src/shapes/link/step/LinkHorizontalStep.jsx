import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { path as d3Path } from 'd3-path';

export function pathHorizontalStep({ source, target, x, y, percent }) {
  return data => {
    const sourceData = source(data);
    const targetData = target(data);

    const sx = x(sourceData);
    const sy = y(sourceData);
    const tx = x(targetData);
    const ty = y(targetData);

    const path = d3Path();
    path.moveTo(sx, sy);
    path.lineTo(sx + (tx - sx) * percent, sy);
    path.lineTo(sx + (tx - sx) * percent, ty);
    path.lineTo(tx, ty);

    return path.toString();
  };
}

LinkHorizontalStep.propTypes = {
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  percent: PropTypes.number,
  x: PropTypes.func,
  y: PropTypes.func,
  source: PropTypes.func,
  target: PropTypes.func,
  path: PropTypes.func,
  children: PropTypes.func,
  className: PropTypes.string,
  data: PropTypes.any,
};

export default function LinkHorizontalStep({
  className,
  innerRef,
  data,
  path,
  percent = 0.5,
  x = d => d.y,
  y = d => d.x,
  source = d => d.source,
  target = d => d.target,
  children,
  ...restProps
}) {
  const pathGen = path || pathHorizontalStep({ source, target, x, y, percent });
  if (children) return children({ path });
  return (
    <path
      ref={innerRef}
      className={cx('vx-link vx-link-horizontal-step', className)}
      d={pathGen(data)}
      {...restProps}
    />
  );
}
