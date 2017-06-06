import React from 'react';
import cx from 'classnames';
import { linkHorizontal } from 'd3-shape';
import additionalProps from '../util/additionalProps';

export default function LinkHorizontal({
  className,
  data,
  x = d => d.y,
  y = d => d.x,
  ...restProps
}) {
  const link = linkHorizontal()
  link.x(x);
  link.y(y);
  return (
    <path
      className={cx('vx-link-horizontal', className)}
      d={link(data)}
      {...additionalProps(restProps, data)}
    />
  );
}