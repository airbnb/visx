import type { StringLike } from '../types/Base';
import type { DefaultThresholdInput, D3Scale } from '../types/Scale';
import type { ScaleConfigWithoutType } from '../types/ScaleConfig';

export default function applyZero<
  Output,
  DiscreteInput extends StringLike,
  ThresholdInput extends DefaultThresholdInput,
>(
  scale: D3Scale<Output, DiscreteInput, ThresholdInput>,
  config: ScaleConfigWithoutType<Output, DiscreteInput, ThresholdInput>,
) {
  if ('zero' in config && config.zero === true) {
    const domain = [...(scale.domain() as number[])];
    if (domain.length >= 2) {
      // Only extend the ends of the domain, so that the interior values of a
      // piecewise (polylinear) domain are kept.
      const last = domain.length - 1;
      const isDescending = domain[last] < domain[0];
      if (isDescending) {
        domain[0] = Math.max(0, domain[0]);
        domain[last] = Math.min(0, domain[last]);
      } else {
        domain[0] = Math.min(0, domain[0]);
        domain[last] = Math.max(0, domain[last]);
      }
      scale.domain(domain);
    }
  }
}
