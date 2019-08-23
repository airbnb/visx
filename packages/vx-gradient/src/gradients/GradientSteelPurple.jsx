import React from 'react';
import PropTypes from 'prop-types';

import LinearGradient from './LinearGradient';

GradientSteelPurple.propTypes = {
  from: PropTypes.string,
  to: PropTypes.string,
};
/**
 * All props pass through to `<LinearGradient {...props} />`
 */
export default function GradientSteelPurple({ from = '#65799B', to = '#5E2563', ...restProps }) {
  return <LinearGradient from={from} to={to} {...restProps} />;
}
