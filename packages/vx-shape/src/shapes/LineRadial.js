import React from 'react';
import cx from 'classnames';
import { radialLine } from 'd3-shape';
import additionalProps from '../util/additionalProps';

export default function LineRadial({
  className = '',
  angle,
  radius,
  defined,
  curve,
  data,
  ...restProps
}) {
  const path = radialLine();
  if (angle) path.angle(angle);
  if (radius) path.radius(radius);
  if (defined) path.defined(defined);
  if (curve) path.curve(curve);
  return (
    <g>
      <path
        className={cx('vx-line-radial', className)}
        d={path(data)}
        {...additionalProps(restProps, data)}
      />
    </g>
  );
}
