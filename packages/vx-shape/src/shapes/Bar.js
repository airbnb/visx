import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

Bar.propTypes = {
  className: PropTypes.string,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
};

export default function Bar({ className, innerRef, ...restProps }) {
  return <rect ref={innerRef} className={cx('vx-bar', className)} {...restProps} />;
}
