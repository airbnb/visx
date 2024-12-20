import { scaleSymlog } from '@visx/vendor/d3-scale';
import type { DefaultOutput } from '../types/Base';
import type { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import scaleOperator from '../operators/scaleOperator';

export const updateSymlogScale = scaleOperator<'symlog'>(
  'domain',
  'range',
  'reverse',
  'clamp',
  'constant',
  'nice',
  'zero',
  'round',
);

export default function createSymlogScale<Output = DefaultOutput>(
  config?: PickScaleConfigWithoutType<'symlog', Output>,
) {
  return updateSymlogScale(scaleSymlog<Output>(), config);
}
