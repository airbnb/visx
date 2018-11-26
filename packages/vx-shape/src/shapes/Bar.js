import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

Bar.propTypes = {
  innerRef: PropTypes.func,
  className: PropTypes.string
};

export default function Bar({ className, innerRef, ...restProps }) {
  return <rect ref={innerRef} className={cx('vx-bar', className)} {...restProps} />;
}
