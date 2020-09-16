import React from 'react';
import LinearGradient, { LinearGradientProps } from './LinearGradient';

/**
 * All props pass through to `<LinearGradient {...props} />`
 */
export default function GradientPurpleRed({
  from = '#622774',
  to = '#C53364',
  ...restProps
}: LinearGradientProps) {
  return <LinearGradient from={from} to={to} {...restProps} />;
}
