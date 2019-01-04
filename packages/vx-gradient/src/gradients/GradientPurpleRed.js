import React from 'react';
import LinearGradient from './LinearGradient';

/**
 * All props pass through to `<LinearGradient {...props} />`
 */
export default function GradientPurpleRed({ from = '#622774', to = '#C53364', ...restProps }) {
  return <LinearGradient from={from} to={to} {...restProps} />;
}
