import React from 'react';
import cx from 'classnames';
import { linkRadial } from 'd3-shape';
import additionalProps from '../util/additionalProps';

export default function LinkRadial({
  className,
  data,
  angle = d => d.x,
  radius = d => d.y,
  ...restProps
}) {
  const link = linkRadial()
  link.angle(angle);
  link.radius(radius);
  return (
    <path
      className={cx('vx-link-radius', className)}
      d={link(data)}
      {...additionalProps(restProps, data)}
    />
  );
}