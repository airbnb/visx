import React from 'react';
import LinearGradient from './LinearGradient';

/**
 * All props pass through to `<LinearGradient {...props} />`
 */
export default function GradientPurpleOrange({ from = '#7117EA', to = '#EA6060', ...restProps }) {
  return <LinearGradient from={from} to={to} {...restProps} />;
}
