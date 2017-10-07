import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { linkHorizontal } from 'd3-shape';
import additionalProps from '../util/additionalProps';

LinkHorizontal.propTypes = {
  innerRef: PropTypes.func,
};

export default function LinkHorizontal({
  className,
  innerRef,
  data,
  x = d => d.y,
  y = d => d.x,
  ...restProps
}) {
  const link = linkHorizontal();
  link.x(x);
  link.y(y);
  return (
    <path
      ref={innerRef}
      className={cx('vx-link-horizontal', className)}
      d={link(data)}
      {...additionalProps(restProps, data)}
    />
  );
}
