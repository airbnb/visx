import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { pointRadial } from 'd3-shape';
import { path as d3Path } from 'd3-path';
import additionalProps from '../../../util/additionalProps';

LinkRadialCurve.propTypes = {
  innerRef: PropTypes.func
};

export default function LinkRadialCurve({
  className,
  innerRef,
  data,
  x = d => d.x,
  y = d => d.y,
  source = d => d.source,
  target = d => d.target,
  ...restProps
}) {

  const link = (data) => {
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

    const sx = sr * sc;
    const sy = sr * ss;
    const tx = tr * tc;
    const ty = tr * ts;

    const dx = tx - sx;
    const dy = ty - sy;
    const ix = 0.2 * (dx + dy);
    const iy = 0.2 * (dy - dx);

    const path =  d3Path();
    path.moveTo(sx, sy)
    path.bezierCurveTo(sx + ix, sy + iy, tx + iy, ty - ix, tx, ty)

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