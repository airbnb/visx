import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

Circle.propTypes = {
  innerRef: PropTypes.func,
  className: PropTypes.string
};

export default function Circle({ className, innerRef, ...restProps }) {
  return <circle ref={innerRef} className={cx('vx-circle', className)} {...restProps} />;
}
