import { scaleBand } from 'd3-scale';
import { Value, StringLike } from '../types/Base';
import { PickScaleConfigWithoutType } from '../types/ScaleConfig';
import { ScaleTypeToD3Scale } from '../types/Scale';
import { updatePointScale } from './point';

export function updateBandScale<DiscreteInput extends StringLike = StringLike>(
  scale: ScaleTypeToD3Scale<Value, DiscreteInput>['band'],
  config: PickScaleConfigWithoutType<'band', Value, DiscreteInput>,
) {
  const { paddingInner, paddingOuter } = config;

  updatePointScale(scale, config);
  if (typeof paddingInner !== 'undefined') scale.paddingInner(paddingInner);
  if (typeof paddingOuter !== 'undefined') scale.paddingOuter(paddingOuter);

  return scale;
}

export default function createBandScale<DiscreteInput extends StringLike = StringLike>(
  config: PickScaleConfigWithoutType<'band', Value, DiscreteInput>,
) {
  return updateBandScale(scaleBand<DiscreteInput>(), config);
}
