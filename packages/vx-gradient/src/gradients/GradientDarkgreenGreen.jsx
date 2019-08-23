import React from 'react';
import PropTypes from 'prop-types';

import LinearGradient from './LinearGradient';

GradientDarkGreen.propTypes = {
  from: PropTypes.string,
  to: PropTypes.string,
};

/**
 * All props pass through to `<LinearGradient {...props} />`
 */
export default function GradientDarkGreen({ from = '#184E86', to = '#57CA85', ...restProps }) {
  return <LinearGradient from={from} to={to} {...restProps} />;
}
