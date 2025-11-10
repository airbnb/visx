import type { LinearGradientProps } from './LinearGradient';
import LinearGradient from './LinearGradient';

/**
 * All props pass through to `<LinearGradient {...props} />`
 */
export default function GradientLightgreenGreen({
  from = '#42E695',
  to = '#3BB2B8',
  ...restProps
}: LinearGradientProps) {
  return <LinearGradient from={from} to={to} {...restProps} />;
}
