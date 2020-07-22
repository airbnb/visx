import { scaleSqrt } from 'd3-scale';
import { Value } from '../types/Base';
import { ScaleTypeToD3Scale } from '../types/Scale';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import { updatePowScale } from './power';

export function updateSqrtScale<Output = Value>(
  scale: ScaleTypeToD3Scale<Output>['sqrt'],
  config: PickScaleConfigWithoutType<'sqrt', Output>,
) {
  return updatePowScale(scale, { ...config, exponent: 0.5 });
}

export default function createSqrtScale<Output = Value>(
  config: PickScaleConfigWithoutType<'sqrt', Output>,
) {
  return updateSqrtScale(scaleSqrt<Output>(), config);
}
