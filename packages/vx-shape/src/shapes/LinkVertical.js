import React from 'react';
import cx from 'classnames';
import { linkVertical } from 'd3-shape';
import additionalProps from '../util/additionalProps';

export default function LinkVertical({
  className,
  data,
  x = d => d.x,
  y = d => d.y,
  ...restProps
}) {
  const link = linkVertical()
  link.x(x);
  link.y(y);
  return (
    <path
      className={cx('vx-link-vertical', className)}
      d={link(data)}
      {...additionalProps(restProps, data)}
    />
  );
}