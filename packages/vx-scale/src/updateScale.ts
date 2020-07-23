import { ScaleConfig, PickScaleConfigWithoutType } from './types/ScaleConfig';
import { DefaultThresholdInput, D3Scale, PickD3Scale } from './types/Scale';
import { StringLike, Value } from './types/Base';
import { updateThresholdScale } from './scales/threshold';
import { updateQuantileScale } from './scales/quantile';
import { updateBandScale } from './scales/band';
import { updatePointScale } from './scales/point';
import { updateOrdinalScale } from './scales/ordinal';
import { updateLogScale } from './scales/log';
import { updateSymlogScale } from './scales/symlog';
import { updatePowScale } from './scales/power';
import { updateQuantizeScale } from './scales/quantize';
import { updateTimeScale } from './scales/time';
import { updateLinearScale } from './scales/linear';
import { updateSqrtScale } from './scales/squareRoot';
import { updateUtcScale } from './scales/utc';
import inferScaleType from './utils/inferScaleType';

// Overload function signature for more strict typing, e.g.,
// If the scale is a ScaleLinear, the config is a linear config.

function updateScale<
  Output extends Value = Value,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput
>(
  scale: PickD3Scale<'linear', Output>,
  config: PickScaleConfigWithoutType<'linear', Output>,
): PickD3Scale<'linear', Output>;

function updateScale<
  Output extends Value = Value,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput
>(
  scale: PickD3Scale<'log', Output>,
  config: PickScaleConfigWithoutType<'log', Output>,
): PickD3Scale<'log', Output>;

function updateScale<
  Output extends Value = Value,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput
>(
  scale: PickD3Scale<'pow', Output>,
  config: PickScaleConfigWithoutType<'pow', Output>,
): PickD3Scale<'pow', Output>;

function updateScale<
  Output extends Value = Value,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput
>(
  scale: PickD3Scale<'sqrt', Output>,
  config: PickScaleConfigWithoutType<'sqrt', Output>,
): PickD3Scale<'sqrt', Output>;

function updateScale<
  Output extends Value = Value,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput
>(
  scale: PickD3Scale<'symlog', Output>,
  config: PickScaleConfigWithoutType<'symlog', Output>,
): PickD3Scale<'symlog', Output>;

function updateScale<
  Output extends Value = Value,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput
>(
  scale: PickD3Scale<'time', Output>,
  config: PickScaleConfigWithoutType<'time', Output>,
): PickD3Scale<'time', Output>;

function updateScale<
  Output extends Value = Value,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput
>(
  scale: PickD3Scale<'utc', Output>,
  config: PickScaleConfigWithoutType<'utc', Output>,
): PickD3Scale<'utc', Output>;

function updateScale<
  Output extends Value = Value,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput
>(
  scale: PickD3Scale<'quantile', Output>,
  config: PickScaleConfigWithoutType<'quantile', Output>,
): PickD3Scale<'quantile', Output>;

function updateScale<
  Output extends Value = Value,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput
>(
  scale: PickD3Scale<'quantize', Output>,
  config: PickScaleConfigWithoutType<'quantize', Output>,
): PickD3Scale<'quantize', Output>;

function updateScale<
  Output extends Value = Value,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput
>(
  scale: PickD3Scale<'threshold', Output, StringLike, ThresholdInput>,
  config: PickScaleConfigWithoutType<'threshold', Output, StringLike, ThresholdInput>,
): PickD3Scale<'threshold', Output, StringLike, ThresholdInput>;

function updateScale<
  Output extends Value = Value,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput
>(
  scale: PickD3Scale<'ordinal', Output, DiscreteInput>,
  config: PickScaleConfigWithoutType<'ordinal', Output, DiscreteInput>,
): PickD3Scale<'ordinal', Output, DiscreteInput>;

function updateScale<
  Output extends Value = Value,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput
>(
  scale: PickD3Scale<'point', Output, DiscreteInput>,
  config: PickScaleConfigWithoutType<'point', Output, DiscreteInput>,
): PickD3Scale<'point', Output, DiscreteInput>;

function updateScale<
  Output extends Value = Value,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput
>(
  scale: PickD3Scale<'band', Output, DiscreteInput>,
  config: PickScaleConfigWithoutType<'band', Output, DiscreteInput>,
): PickD3Scale<'band', Output, DiscreteInput>;

function updateScale<
  Output extends Value = Value,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
  Scale extends D3Scale<Output, DiscreteInput, ThresholdInput> = D3Scale<
    Output,
    DiscreteInput,
    ThresholdInput
  >
>(scale: Scale, config?: undefined): Scale;

// Actual implementation

function updateScale<
  Output extends Value,
  DiscreteInput extends StringLike,
  ThresholdInput extends DefaultThresholdInput
>(
  scale: D3Scale<Output, DiscreteInput, ThresholdInput>,
  config?: Omit<ScaleConfig<Output, DiscreteInput, ThresholdInput>, 'type'>,
) {
  const scaleOut = scale.copy() as D3Scale<Output, DiscreteInput, ThresholdInput>;

  // If a config is not specified, just return a copy
  if (typeof config === 'undefined') {
    return scaleOut;
  }

  const type = inferScaleType(scale);

  // Function overloading above should ensure the scale and config
  // are compatible matches.
  // Just cast the scale and config to the correct types.

  switch (type) {
    case 'linear':
      return updateLinearScale(
        scaleOut as PickD3Scale<'linear', Output, DiscreteInput, ThresholdInput>,
        config as PickScaleConfigWithoutType<'linear', Output, DiscreteInput, ThresholdInput>,
      );
    case 'log':
      return updateLogScale(
        scaleOut as PickD3Scale<'log', Output, DiscreteInput, ThresholdInput>,
        config as PickScaleConfigWithoutType<'log', Output, DiscreteInput, ThresholdInput>,
      );
    case 'pow':
      return updatePowScale(
        scaleOut as PickD3Scale<'pow', Output, DiscreteInput, ThresholdInput>,
        config as PickScaleConfigWithoutType<'pow', Output, DiscreteInput, ThresholdInput>,
      );
    case 'sqrt':
      return updateSqrtScale(
        scaleOut as PickD3Scale<'sqrt', Output, DiscreteInput, ThresholdInput>,
        config as PickScaleConfigWithoutType<'sqrt', Output, DiscreteInput, ThresholdInput>,
      );
    case 'symlog':
      return updateSymlogScale(
        scaleOut as PickD3Scale<'symlog', Output, DiscreteInput, ThresholdInput>,
        config as PickScaleConfigWithoutType<'symlog', Output, DiscreteInput, ThresholdInput>,
      );
    case 'time':
      return updateTimeScale(
        scaleOut as PickD3Scale<'time', Output, DiscreteInput, ThresholdInput>,
        config as PickScaleConfigWithoutType<'time', Output, DiscreteInput, ThresholdInput>,
      );
    case 'utc':
      return updateUtcScale(
        scaleOut as PickD3Scale<'utc', Output, DiscreteInput, ThresholdInput>,
        config as PickScaleConfigWithoutType<'utc', Output, DiscreteInput, ThresholdInput>,
      );
    case 'quantile':
      return updateQuantileScale(
        scaleOut as PickD3Scale<'quantile', Output, DiscreteInput, ThresholdInput>,
        config as PickScaleConfigWithoutType<'quantile', Output, DiscreteInput, ThresholdInput>,
      );
    case 'quantize':
      return updateQuantizeScale(
        scaleOut as PickD3Scale<'quantize', Output, DiscreteInput, ThresholdInput>,
        config as PickScaleConfigWithoutType<'quantize', Output, DiscreteInput, ThresholdInput>,
      );
    case 'threshold':
      return updateThresholdScale(
        scaleOut as PickD3Scale<'threshold', Output, DiscreteInput, ThresholdInput>,
        config as PickScaleConfigWithoutType<'threshold', Output, DiscreteInput, ThresholdInput>,
      );
    case 'ordinal':
      return updateOrdinalScale(
        scaleOut as PickD3Scale<'ordinal', Output, DiscreteInput, ThresholdInput>,
        config as PickScaleConfigWithoutType<'ordinal', Output, DiscreteInput, ThresholdInput>,
      );
    case 'point':
      return updatePointScale(
        scaleOut as PickD3Scale<'point', Output, DiscreteInput, ThresholdInput>,
        config as PickScaleConfigWithoutType<'point', Output, DiscreteInput, ThresholdInput>,
      );
    case 'band':
      return updateBandScale(
        scaleOut as PickD3Scale<'band', Output, DiscreteInput, ThresholdInput>,
        config as PickScaleConfigWithoutType<'band', Output, DiscreteInput, ThresholdInput>,
      );
    default:
      return scaleOut;
  }
}

export default updateScale;
