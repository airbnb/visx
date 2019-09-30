import React from 'react';
import PropTypes from 'prop-types';

import LinearGradient from './LinearGradient';

GradientPinkRed.propTypes = {
  from: PropTypes.string,
  to: PropTypes.string,
};

/**
 * All props pass through to `<LinearGradient {...props} />`
 */
export default function GradientPinkRed({ from = '#F54EA2', to = '#FF7676', ...restProps }) {
  return <LinearGradient from={from} to={to} {...restProps} />;
}
