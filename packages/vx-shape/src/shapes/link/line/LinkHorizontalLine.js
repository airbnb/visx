import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import additionalProps from '../../../util/additionalProps';

LinkHorizontalLine.propTypes = {
  innerRef: PropTypes.func
};

export default function LinkHorizontalLine({
  className,
  innerRef,
  data,
  x = d => d.y,
  y = d => d.x,
  ...restProps
}) {
  const line = (source, target) => `
    M${x(source)},${y(source)}
    L${x(target)},${y(target)}
  `;

  return (
    <path
      ref={innerRef}
      className={cx('vx-link', className)}
      d={line(data.source, data.target)}
      {...restProps}
    />
  );
}
