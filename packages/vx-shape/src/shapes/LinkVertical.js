import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { linkVertical } from 'd3-shape';
import additionalProps from '../util/additionalProps';

LinkVertical.propTypes = {
  innerRef: PropTypes.func,
};

export default function LinkVertical({
  className,
  innerRef,
  data,
  x = d => d.x,
  y = d => d.y,
  ...restProps
}) {
  const link = linkVertical();
  link.x(x);
  link.y(y);
  return (
    <path
      ref={innerRef}
      className={cx('vx-link-vertical', className)}
      d={link(data)}
      {...additionalProps(restProps, data)}
    />
  );
}
