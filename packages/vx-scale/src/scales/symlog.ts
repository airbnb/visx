import { scaleSymlog } from 'd3-scale';
import { DefaultOutput } from '../types/Base';
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

export default function createSymlogScale<Output = DefaultOutput>(
  config?: PickScaleConfigWithoutType<'symlog', Output>,
) {
  return updateSymlogScale(scaleSymlog<Output>(), config);
}
