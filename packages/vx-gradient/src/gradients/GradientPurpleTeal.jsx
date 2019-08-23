import React from 'react';
import PropTypes from 'prop-types';

import LinearGradient from './LinearGradient';

GradientPurpleTeal.propTypes = {
  from: PropTypes.string,
  to: PropTypes.string,
};

/**
 * All props pass through to `<LinearGradient {...props} />`
 */
export default function GradientPurpleTeal({ from = '#5B247A', to = '#1BCEDF', ...restProps }) {
  return <LinearGradient from={from} to={to} {...restProps} />;
}
