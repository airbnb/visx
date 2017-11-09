import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { pointRadial } from 'd3-shape';
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
  ...restProps
}) {

  const curve = (source, target) => {
    const sa = x(source) - Math.PI / 2;
    const sr = y(source);
    const ta = x(target) - Math.PI / 2;
    const tr = y(target);

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

    return `M${sx},${sy}
      C${sx + ix},${sy + iy}
      ${tx + iy},${ty - ix}
      ${tx},${ty}
    `;
  };

  return (
    <path
      ref={innerRef}
      className={cx('vx-link', className)}
      d={curve(data.source, data.target)}
      {...restProps}
    />
  );
}