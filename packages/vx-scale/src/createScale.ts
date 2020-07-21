import { ScaleConfig, ScaleTypeToScaleConfig } from './types/ScaleConfig';
import { StringLike, Value } from './types/Base';
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
import { ScaleTypeToD3Scale } from './types/Scale';

// Overload function for more strict typing, e.g.,
// If the config is a linear config then a ScaleLinear will be returned
// instead of a union type of all scales.

function createScale<
  Output extends Value,
  DiscreteInput extends StringLike,
  ThresholdInput extends number | string | Date
>(
  config:
    | ScaleTypeToScaleConfig<Output, DiscreteInput, ThresholdInput>['linear']
    | Omit<ScaleTypeToScaleConfig<Output, DiscreteInput, ThresholdInput>['linear'], 'type'>,
): ScaleTypeToD3Scale<Output, DiscreteInput, ThresholdInput>['linear'];

function createScale<
  Output extends Value,
  DiscreteInput extends StringLike,
  ThresholdInput extends number | string | Date
>(
  config: ScaleTypeToScaleConfig<Output, DiscreteInput, ThresholdInput>['log'],
): ScaleTypeToD3Scale<Output, DiscreteInput, ThresholdInput>['log'];

function createScale<
  Output extends Value,
  DiscreteInput extends StringLike,
  ThresholdInput extends number | string | Date
>(
  config: ScaleTypeToScaleConfig<Output, DiscreteInput, ThresholdInput>['pow'],
): ScaleTypeToD3Scale<Output, DiscreteInput, ThresholdInput>['pow'];

function createScale<
  Output extends Value,
  DiscreteInput extends StringLike,
  ThresholdInput extends number | string | Date
>(
  config: ScaleTypeToScaleConfig<Output, DiscreteInput, ThresholdInput>['sqrt'],
): ScaleTypeToD3Scale<Output, DiscreteInput, ThresholdInput>['sqrt'];

function createScale<
  Output extends Value,
  DiscreteInput extends StringLike,
  ThresholdInput extends number | string | Date
>(
  config: ScaleTypeToScaleConfig<Output, DiscreteInput, ThresholdInput>['sqrt'],
): ScaleTypeToD3Scale<Output, DiscreteInput, ThresholdInput>['symlog'];

function createScale<
  Output extends Value,
  DiscreteInput extends StringLike,
  ThresholdInput extends number | string | Date
>(
  config: ScaleTypeToScaleConfig<Output, DiscreteInput, ThresholdInput>['time'],
): ScaleTypeToD3Scale<Output, DiscreteInput, ThresholdInput>['time'];

function createScale<
  Output extends Value,
  DiscreteInput extends StringLike,
  ThresholdInput extends number | string | Date
>(
  config: ScaleTypeToScaleConfig<Output, DiscreteInput, ThresholdInput>['utc'],
): ScaleTypeToD3Scale<Output, DiscreteInput, ThresholdInput>['utc'];

function createScale<
  Output extends Value,
  DiscreteInput extends StringLike,
  ThresholdInput extends number | string | Date
>(
  config: ScaleTypeToScaleConfig<Output, DiscreteInput, ThresholdInput>['quantile'],
): ScaleTypeToD3Scale<Output, DiscreteInput, ThresholdInput>['quantile'];

function createScale<
  Output extends Value,
  DiscreteInput extends StringLike,
  ThresholdInput extends number | string | Date
>(
  config: ScaleTypeToScaleConfig<Output, DiscreteInput, ThresholdInput>['quantize'],
): ScaleTypeToD3Scale<Output, DiscreteInput, ThresholdInput>['quantize'];

function createScale<
  Output extends Value,
  DiscreteInput extends StringLike,
  ThresholdInput extends number | string | Date
>(
  config: ScaleTypeToScaleConfig<Output, DiscreteInput, ThresholdInput>['threshold'],
): ScaleTypeToD3Scale<Output, DiscreteInput, ThresholdInput>['threshold'];

function createScale<
  Output extends Value,
  DiscreteInput extends StringLike,
  ThresholdInput extends number | string | Date
>(
  config: ScaleTypeToScaleConfig<Output, DiscreteInput, ThresholdInput>['ordinal'],
): ScaleTypeToD3Scale<Output, DiscreteInput, ThresholdInput>['ordinal'];

function createScale<
  Output extends Value,
  DiscreteInput extends StringLike,
  ThresholdInput extends number | string | Date
>(
  config: ScaleTypeToScaleConfig<Output, DiscreteInput, ThresholdInput>['point'],
): ScaleTypeToD3Scale<Output, DiscreteInput, ThresholdInput>['point'];

function createScale<
  Output extends Value,
  DiscreteInput extends StringLike,
  ThresholdInput extends number | string | Date
>(
  config: ScaleTypeToScaleConfig<Output, DiscreteInput, ThresholdInput>['band'],
): ScaleTypeToD3Scale<Output, DiscreteInput, ThresholdInput>['band'];

// Actual implementation

function createScale<
  Output extends Value,
  DiscreteInput extends StringLike,
  ThresholdInput extends number | string | Date
>(
  config:
    | ScaleConfig<Output, DiscreteInput, ThresholdInput>
    | Omit<ScaleTypeToScaleConfig<Output, DiscreteInput, ThresholdInput>['linear'], 'type'>,
) {
  if ('type' in config) {
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
        // @ts-ignore
        throw new Error(`Invalid scale type: ${config.type}`);
    }
  }

  // If type is not specified, fallback to linear scale
  return createLinearScale({ ...config, type: 'linear' });
}

export default createScale;
