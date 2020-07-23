import { scaleSymlog } from 'd3-scale';
import { Value } from '../types/Base';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import scaleOperator from '../operators/scaleOperator';

export const updateSymlogScale = scaleOperator<'symlog'>(
  'domain',
  'range',
  'clamp',
  'constant',
  'nice',
  'zero',
);

export default function createSymlogScale<Output = Value>(
  config: PickScaleConfigWithoutType<'symlog', Output>,
) {
  return updateSymlogScale(scaleSymlog<Output>(), config);
}
