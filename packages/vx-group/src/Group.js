import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import PropTypes from 'prop-types';

Group.propTypes = {
  top: PropTypes.number,
  left: PropTypes.number,
  transform: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any
};

Group.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  top: PropTypes.number,
  left: PropTypes.number,
  transform: PropTypes.string
};

export default function Group({ top = 0, left = 0, transform, className, children, ...restProps }) {
  return (
    <g
      className={cx('vx-group', className)}
      transform={transform || `translate(${left}, ${top})`}
      {...restProps}
    >
      {children}
    </g>
  );
}
