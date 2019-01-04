import React from 'react';
import LinearGradient from './LinearGradient';

/**
 * All props pass through to `<LinearGradient {...props} />`
 */
export default function GradientTealBlue({ from = '#17EAD9', to = '#6078EA', ...restProps }) {
  return <LinearGradient from={from} to={to} {...restProps} />;
}
