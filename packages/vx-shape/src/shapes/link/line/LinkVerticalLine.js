import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import additionalProps from '../../../util/additionalProps';

LinkVerticalLine.propTypes = {
  innerRef: PropTypes.func
};

export default function LinkVerticalLine({
  className,
  innerRef,
  data,
  x = d => d.x,
  y = d => d.y,
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
