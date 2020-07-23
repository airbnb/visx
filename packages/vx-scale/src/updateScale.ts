import { ScaleTime, ScaleLinear } from 'd3-scale';
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

// Overload function signature for more strict typing, e.g.,
// If the scale is a ScaleLinear, the config is a linear config.

function updateScale<Output extends Value>(
  scale: PickD3Scale<'linear', Output>,
  config: PickScaleConfigWithoutType<'linear', Output>,
): PickD3Scale<'linear', Output>;

function updateScale<Output extends Value>(
  scale: PickD3Scale<'log', Output>,
  config: PickScaleConfigWithoutType<'log', Output>,
): PickD3Scale<'log', Output>;

function updateScale<Output extends Value>(
  scale: PickD3Scale<'pow', Output>,
  config: PickScaleConfigWithoutType<'pow', Output>,
): PickD3Scale<'pow', Output>;

function updateScale<Output extends Value>(
  scale: PickD3Scale<'sqrt', Output>,
  config: PickScaleConfigWithoutType<'sqrt', Output>,
): PickD3Scale<'sqrt', Output>;

function updateScale<Output extends Value>(
  scale: PickD3Scale<'symlog', Output>,
  config: PickScaleConfigWithoutType<'symlog', Output>,
): PickD3Scale<'symlog', Output>;

function updateScale<Output extends Value>(
  scale: PickD3Scale<'time', Output>,
  config: PickScaleConfigWithoutType<'time', Output>,
): PickD3Scale<'time', Output>;

function updateScale<Output extends Value>(
  scale: PickD3Scale<'utc', Output>,
  config: PickScaleConfigWithoutType<'utc', Output>,
): PickD3Scale<'utc', Output>;

function updateScale<Output extends Value>(
  scale: PickD3Scale<'quantile', Output>,
  config: PickScaleConfigWithoutType<'quantile', Output>,
): PickD3Scale<'quantile', Output>;

function updateScale<Output extends Value>(
  scale: PickD3Scale<'quantize', Output>,
  config: PickScaleConfigWithoutType<'quantize', Output>,
): PickD3Scale<'quantize', Output>;

function updateScale<Output extends Value, ThresholdInput extends DefaultThresholdInput>(
  scale: PickD3Scale<'threshold', Output, StringLike, ThresholdInput>,
  config: PickScaleConfigWithoutType<'threshold', Output, StringLike, ThresholdInput>,
): PickD3Scale<'threshold', Output, StringLike, ThresholdInput>;

function updateScale<Output extends Value, DiscreteInput extends StringLike>(
  scale: PickD3Scale<'ordinal', Output, DiscreteInput>,
  config: PickScaleConfigWithoutType<'ordinal', Output, DiscreteInput>,
): PickD3Scale<'ordinal', Output, DiscreteInput>;

function updateScale<Output extends Value, DiscreteInput extends StringLike>(
  scale: PickD3Scale<'point', Output, DiscreteInput>,
  config: PickScaleConfigWithoutType<'point', Output, DiscreteInput>,
): PickD3Scale<'point', Output, DiscreteInput>;

function updateScale<Output extends Value, DiscreteInput extends StringLike>(
  scale: PickD3Scale<'band', Output, DiscreteInput>,
  config: PickScaleConfigWithoutType<'band', Output, DiscreteInput>,
): PickD3Scale<'band', Output, DiscreteInput>;

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

  // Try a sequence of typeguards to figure out the scale type
  // and cast the config to correct type.
  // Function overloading above should ensure the scale and config
  // are compatible matches.

  if ('paddingInner' in scaleOut) {
    // Band scale
    return updateBandScale(
      scaleOut,
      config as PickScaleConfigWithoutType<'band', Output, DiscreteInput, ThresholdInput>,
    );
  }

  if ('padding' in scaleOut) {
    // Point scale
    return updatePointScale(
      scaleOut,
      config as PickScaleConfigWithoutType<'point', Output, DiscreteInput, ThresholdInput>,
    );
  }

  if ('unknown' in scaleOut) {
    // Ordinal scale
    return updateOrdinalScale(
      scaleOut,
      config as PickScaleConfigWithoutType<'ordinal', Output, DiscreteInput, ThresholdInput>,
    );
  }

  if ('quantiles' in scaleOut) {
    // Quantile scale
    return updateQuantileScale(scaleOut, config as PickScaleConfigWithoutType<'quantile', Output>);
  }

  if ('base' in scaleOut) {
    // Log scale
    return updateLogScale(scaleOut, config as PickScaleConfigWithoutType<'log', Output>);
  }

  if ('exponent' in scaleOut) {
    // Pow or Sqrt scale
    return updatePowScale(scaleOut, config as PickScaleConfigWithoutType<'pow', Output>);
  }

  if ('constant' in scaleOut) {
    // Symlog scale
    return updateSymlogScale(scaleOut, config as PickScaleConfigWithoutType<'symlog', Output>);
  }

  if ('clamp' in scaleOut) {
    // Linear, Time or Utc scales
    if (scaleOut.ticks()[0] instanceof Date) {
      // Time or Utc scales
      return updateTimeScale(
        scaleOut as ScaleTime<Output, Output>,
        config as PickScaleConfigWithoutType<'time', Output>,
      );
    }
    // Linear scale
    return updateLinearScale(
      scaleOut as ScaleLinear<Output, Output>,
      config as PickScaleConfigWithoutType<'linear', Output>,
    );
  }

  if ('nice' in scaleOut) {
    // Symlog scale
    return updateQuantizeScale(scaleOut, config as PickScaleConfigWithoutType<'quantize', Output>);
  }

  // The last type remaining is Threshold scale
  return updateThresholdScale(
    scaleOut,
    config as PickScaleConfigWithoutType<'threshold', Output, DiscreteInput, ThresholdInput>,
  );
}

export default updateScale;
