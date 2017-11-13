import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { pointRadial } from 'd3-shape';
import additionalProps from '../../../util/additionalProps';

LinkHorizontalCurve.propTypes = {
  innerRef: PropTypes.func
};

export default function LinkHorizontalCurve({
  className,
  innerRef,
  data,
  x = d => d.y,
  y = d => d.x,
  ...restProps
}) {

  const curve = (source, target) => {
    const sx = x(source);
    const sy = y(source);
    const tx = x(target);
    const ty = y(target);

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