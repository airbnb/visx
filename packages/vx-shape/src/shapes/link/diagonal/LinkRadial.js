import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { linkRadial } from 'd3-shape';
import additionalProps from '../../../util/additionalProps';

LinkRadial.propTypes = {
  innerRef: PropTypes.func,
};

export default function LinkRadial({
  className,
  innerRef,
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
      ref={innerRef}
      className={cx('vx-link-radius', className)}
      d={link(data)}
      {...additionalProps(restProps, data)}
    />
  );
}