import React from 'react';
import LinearGradient from './LinearGradient';

/**
 * All props pass through to `<LinearGradient {...props} />`
 */
export default function GradientPurpleTeal({ from = '#5B247A', to = '#1BCEDF', ...restProps }) {
  return <LinearGradient from={from} to={to} {...restProps} />;
}
