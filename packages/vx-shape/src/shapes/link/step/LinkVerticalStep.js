import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { path as d3Path } from 'd3-path';

export function pathVerticalStep({ source, target, x, y, percent }) {
  return data => {
    const sourceData = source(data);
    const targetData = target(data);

    const sx = x(sourceData);
    const sy = y(sourceData);
    const tx = x(targetData);
    const ty = y(targetData);

    const path = d3Path();
    path.moveTo(sx, sy);
    path.lineTo(sx, sy + (ty - sy) * percent);
    path.lineTo(tx, sy + (ty - sy) * percent);
    path.lineTo(tx, ty);

    return path.toString();
  };
}

LinkVerticalStep.propTypes = {
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  percent: PropTypes.number,
  x: PropTypes.func,
  y: PropTypes.func,
  source: PropTypes.func,
  target: PropTypes.func,
  path: PropTypes.func,
  children: PropTypes.func
};

export default function LinkVerticalStep({
  className,
  innerRef,
  data,
  path,
  percent = 0.5,
  x = d => d.x,
  y = d => d.y,
  source = d => d.source,
  target = d => d.target,
  children,
  ...restProps
}) {
  path = path || pathVerticalStep({ source, target, x, y, percent });
  if (children) return children({ path });
  return (
    <path
      ref={innerRef}
      className={cx('vx-link vx-link-vertical-step', className)}
      d={path(data)}
      {...restProps}
    />
  );
}
