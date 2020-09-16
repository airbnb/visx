import React from 'react';
import LinearGradient, { LinearGradientProps } from './LinearGradient';

/**
 * All props pass through to `<LinearGradient {...props} />`
 */
export default function GradientTealBlue({
  from = '#17EAD9',
  to = '#6078EA',
  ...restProps
}: LinearGradientProps) {
  return <LinearGradient from={from} to={to} {...restProps} />;
}
