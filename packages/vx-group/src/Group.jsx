import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

Group.propTypes = {
  top: PropTypes.number,
  left: PropTypes.number,
  transform: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default function Group({
  top = 0,
  left = 0,
  transform,
  className,
  children,
  innerRef,
  ...restProps
}) {
  return (
    <g
      ref={innerRef}
      className={cx('vx-group', className)}
      transform={transform || `translate(${left}, ${top})`}
      {...restProps}
    >
      {children}
    </g>
  );
}
