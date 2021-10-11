import { ScaleConfig, PickScaleConfigWithoutType, PickScaleConfig } from './types/ScaleConfig';
import { DefaultThresholdInput, PickD3Scale, D3Scale } from './types/Scale';
import { StringLike, DefaultOutput } from './types/Base';
import createLinearScale from './scales/linear';
import createLogScale from './scales/log';
import createPowScale from './scales/power';
import createSqrtScale from './scales/squareRoot';
import createSymlogScale from './scales/symlog';
import createTimeScale from './scales/time';
import createUtcScale from './scales/utc';
import createQuantileScale from './scales/quantile';
import createQuantizeScale from './scales/quantize';
import createThresholdScale from './scales/threshold';
import createOrdinalScale from './scales/ordinal';
import createPointScale from './scales/point';
import createBandScale from './scales/band';

// Overload function for more strict typing, e.g.,
// If the config is a linear config then a ScaleLinear will be returned
// instead of a union type of all scales.

function createScale<
  Output = DefaultOutput,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
>(
  config?: PickScaleConfig<'linear', Output> | PickScaleConfigWithoutType<'linear', Output>,
): PickD3Scale<'linear', Output>;

function createScale<
  Output = DefaultOutput,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
>(config: PickScaleConfig<'log', Output>): PickD3Scale<'log', Output>;

function createScale<
  Output = DefaultOutput,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
>(config: PickScaleConfig<'pow', Output>): PickD3Scale<'pow', Output>;

function createScale<
  Output = DefaultOutput,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
>(config: PickScaleConfig<'sqrt', Output>): PickD3Scale<'sqrt', Output>;

function createScale<
  Output = DefaultOutput,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
>(config: PickScaleConfig<'symlog', Output>): PickD3Scale<'symlog', Output>;

function createScale<
  Output = DefaultOutput,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
>(config: PickScaleConfig<'time', Output>): PickD3Scale<'time', Output>;

function createScale<
  Output = DefaultOutput,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
>(config: PickScaleConfig<'utc', Output>): PickD3Scale<'utc', Output>;

function createScale<
  Output = DefaultOutput,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
>(config: PickScaleConfig<'quantile', Output>): PickD3Scale<'quantile', Output>;

function createScale<
  Output = DefaultOutput,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
>(config: PickScaleConfig<'quantize', Output>): PickD3Scale<'quantize', Output>;

function createScale<
  Output = DefaultOutput,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
>(
  config: PickScaleConfig<'threshold', Output, StringLike, ThresholdInput>,
): PickD3Scale<'threshold', Output, StringLike, ThresholdInput>;

function createScale<
  Output = DefaultOutput,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
>(
  config: PickScaleConfig<'ordinal', Output, DiscreteInput>,
): PickD3Scale<'ordinal', Output, DiscreteInput>;

function createScale<
  Output = DefaultOutput,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
>(
  config: PickScaleConfig<'point', Output, DiscreteInput>,
): PickD3Scale<'point', Output, DiscreteInput>;

function createScale<
  Output = DefaultOutput,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
>(
  config: PickScaleConfig<'band', Output, DiscreteInput>,
): PickD3Scale<'band', Output, DiscreteInput>;

function createScale<
  Output = DefaultOutput,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
>(
  config: ScaleConfig<Output, DiscreteInput, ThresholdInput>,
): D3Scale<Output, DiscreteInput, ThresholdInput>;

// Actual implementation

function createScale<
  Output,
  DiscreteInput extends StringLike,
  ThresholdInput extends DefaultThresholdInput,
>(
  config?:
    | ScaleConfig<Output, DiscreteInput, ThresholdInput>
    | PickScaleConfigWithoutType<'linear', Output>,
) {
  if (typeof config !== 'undefined' && 'type' in config) {
    switch (config.type) {
      case 'linear':
        return createLinearScale(config);
      case 'log':
        return createLogScale(config);
      case 'pow':
        return createPowScale(config);
      case 'sqrt':
        return createSqrtScale(config);
      case 'symlog':
        return createSymlogScale(config);
      case 'time':
        return createTimeScale(config);
      case 'utc':
        return createUtcScale(config);
      case 'quantile':
        return createQuantileScale(config);
      case 'quantize':
        return createQuantizeScale(config);
      case 'threshold':
        return createThresholdScale(config);
      case 'ordinal':
        return createOrdinalScale(config);
      case 'point':
        return createPointScale(config);
      case 'band':
        return createBandScale(config);
      default:
    }
  }

  // If type is not specified, fallback to linear scale
  return createLinearScale(config);
}

export default createScale;
