import type { LinearGradientProps } from './LinearGradient';
import LinearGradient from './LinearGradient';

/**
 * All props pass through to `<LinearGradient {...props} />`
 */
export default function GradientPinkBlue({
  from = '#F02FC2',
  to = '#6094EA',
  ...restProps
}: LinearGradientProps) {
  return <LinearGradient from={from} to={to} {...restProps} />;
}
