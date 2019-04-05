import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

Circle.propTypes = {
  className: PropTypes.string,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
};

export default function Circle({ className, innerRef, ...restProps }) {
  return <circle ref={innerRef} className={cx('vx-circle', className)} {...restProps} />;
}
