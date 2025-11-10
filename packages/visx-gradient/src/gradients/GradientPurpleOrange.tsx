import type { LinearGradientProps } from './LinearGradient';
import LinearGradient from './LinearGradient';

/**
 * All props pass through to `<LinearGradient {...props} />`
 */
export default function GradientPurpleOrange({
  from = '#7117EA',
  to = '#EA6060',
  ...restProps
}: LinearGradientProps) {
  return <LinearGradient from={from} to={to} {...restProps} />;
}
