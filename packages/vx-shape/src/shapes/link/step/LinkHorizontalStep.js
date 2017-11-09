import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import additionalProps from '../../../util/additionalProps';

LinkHorizontalStep.propTypes = {
  innerRef: PropTypes.func,
  percent: PropTypes.number
};

export default function LinkHorizontalStep({
  className,
  innerRef,
  data,
  percent = 0.5,
  x = d => d.y,
  y = d => d.x,
  ...restProps
}) {
  const line = (source, target) => `
    M${x(source)},${y(source)}
    H${x(source) + (x(target) - x(source)) * percent}
    V${y(target)}
    H${x(target)}
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