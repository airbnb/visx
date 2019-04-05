import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { path as d3Path } from 'd3-path';

export function pathRadialLine({ source, target, x, y }) {
  return data => {
    const sourceData = source(data);
    const targetData = target(data);

    const sa = x(sourceData) - Math.PI / 2;
    const sr = y(sourceData);
    const ta = x(targetData) - Math.PI / 2;
    const tr = y(targetData);

    const sc = Math.cos(sa);
    const ss = Math.sin(sa);
    const tc = Math.cos(ta);
    const ts = Math.sin(ta);

    const path = d3Path();
    path.moveTo(sr * sc, sr * ss);
    path.lineTo(tr * tc, tr * ts);

    return path.toString();
  };
}

LinkRadialStep.propTypes = {
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  path: PropTypes.func,
  x: PropTypes.func,
  y: PropTypes.func,
  source: PropTypes.func,
  target: PropTypes.func,
  children: PropTypes.func
};

export default function LinkRadialStep({
  className,
  innerRef,
  data,
  path,
  x = d => d.x,
  y = d => d.y,
  source = d => d.source,
  target = d => d.target,
  children,
  ...restProps
}) {
  path = path || pathRadialLine({ source, target, x, y });
  if (children) return children({ path });
  return (
    <path
      ref={innerRef}
      className={cx('vx-link vx-link-radial-line', className)}
      d={path(data)}
      {...restProps}
    />
  );
}
