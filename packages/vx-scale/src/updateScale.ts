import {
  ScaleLinear,
  ScaleLogarithmic,
  ScalePower,
  ScaleSymLog,
  ScaleTime,
  ScaleQuantile,
  ScaleQuantize,
  ScaleThreshold,
  ScaleOrdinal,
  ScalePoint,
  ScaleBand,
} from 'd3-scale';
import { ScaleConfig, ScaleConfigToD3Scale } from './types/ScaleConfig';
import { DefaultThresholdInput, D3Scale } from './types/Scale';
import { StringLike, Value } from './types/Base';
import { updateLinearScale } from './scales/linear';
import { updateLogScale } from './scales/log';
import { updatePowScale } from './scales/power';
import { updateSqrtScale } from './scales/squareRoot';
import { updateSymlogScale } from './scales/symlog';
import { updateTimeScale } from './scales/time';
import { updateUtcScale } from './scales/utc';
import { updateQuantileScale } from './scales/quantile';
import { updateQuantizeScale } from './scales/quantize';
import { updateThresholdScale } from './scales/threshold';
import { updateOrdinalScale } from './scales/ordinal';
import { updatePointScale } from './scales/point';
import { updateBandScale } from './scales/band';

// Overload function for more strict typing, e.g.,
// If the config is a linear config then a ScaleLinear will be returned
// instead of a union type of all scales.

function updateScale<
  Output extends Value,
  DiscreteInput extends StringLike,
  ThresholdInput extends DefaultThresholdInput,
  Config extends ScaleConfig<Output, DiscreteInput, ThresholdInput>
>(
  scale: ScaleConfigToD3Scale<Config, Output, DiscreteInput, ThresholdInput>,
  config: Config,
): ScaleConfigToD3Scale<Config, Output, DiscreteInput, ThresholdInput>;

function updateScale<
  Output extends Value,
  DiscreteInput extends StringLike,
  ThresholdInput extends DefaultThresholdInput,
  Scale extends D3Scale<Output, DiscreteInput, ThresholdInput>
>(scale: Scale, config?: undefined): Scale;

// Actual implementation

function updateScale<
  Output extends Value,
  DiscreteInput extends StringLike,
  ThresholdInput extends DefaultThresholdInput,
  Config extends ScaleConfig<Output, DiscreteInput, ThresholdInput>
>(
  scale: ScaleConfigToD3Scale<Config, Output, DiscreteInput, ThresholdInput>,
  config?: ScaleConfig<Output, DiscreteInput, ThresholdInput>,
) {
  if (typeof config === 'undefined') {
    return scale.copy();
  }

  switch (config.type) {
    case 'linear':
      return updateLinearScale(scale.copy() as ScaleLinear<Output, Output>, config);
    case 'log':
      return updateLogScale(scale as ScaleLogarithmic<Output, Output>, config);
    case 'pow':
      return updatePowScale(scale as ScalePower<Output, Output>, config);
    case 'sqrt':
      return updateSqrtScale(scale as ScalePower<Output, Output>, config);
    case 'symlog':
      return updateSymlogScale(scale as ScaleSymLog<Output, Output>, config);
    case 'time':
      return updateTimeScale(scale as ScaleTime<Output, Output>, config);
    case 'utc':
      return updateUtcScale(scale as ScaleTime<Output, Output>, config);
    case 'quantile':
      return updateQuantileScale(scale as ScaleQuantile<Output>, config);
    case 'quantize':
      return updateQuantizeScale(scale as ScaleQuantize<Output>, config);
    case 'threshold':
      return updateThresholdScale(scale as ScaleThreshold<ThresholdInput, Output>, config);
    case 'ordinal':
      return updateOrdinalScale(scale as ScaleOrdinal<DiscreteInput, Output>, config);
    case 'point':
      return updatePointScale(scale as ScalePoint<DiscreteInput>, config);
    case 'band':
      return updateBandScale(scale as ScaleBand<DiscreteInput>, config);
    default:
      // @ts-ignore
      throw new Error(`Invalid scale type: ${config.type}`);
  }
}

export default updateScale;
