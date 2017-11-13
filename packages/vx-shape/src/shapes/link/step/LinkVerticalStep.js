import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import additionalProps from '../../../util/additionalProps';

LinkVerticalStep.propTypes = {
  innerRef: PropTypes.func,
  percent: PropTypes.number,
};

export default function LinkVerticalStep({
  className,
  innerRef,
  data,
  percent = 0.5,
  x = d => d.x,
  y = d => d.y,
  ...restProps
}) {
  const line = (source, target) => `
    M${x(source)},${y(source)}
    V${y(source) + (y(target) - y(source)) * percent}
    H${x(target)}
    V${y(target)}
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
