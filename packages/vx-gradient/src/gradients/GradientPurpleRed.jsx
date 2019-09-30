import React from 'react';
import PropTypes from 'prop-types';

import LinearGradient from './LinearGradient';

GradientPurpleRed.propTypes = {
  from: PropTypes.string,
  to: PropTypes.string,
};

/**
 * All props pass through to `<LinearGradient {...props} />`
 */
export default function GradientPurpleRed({ from = '#622774', to = '#C53364', ...restProps }) {
  return <LinearGradient from={from} to={to} {...restProps} />;
}
