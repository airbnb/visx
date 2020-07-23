import {
  ScaleOrdinal,
  ScaleLinear,
  ScaleLogarithmic,
  ScalePower,
  ScaleTime,
  ScaleQuantile,
  ScaleQuantize,
  ScaleThreshold,
  ScalePoint,
  ScaleBand,
  ScaleSymLog,
} from 'd3-scale';
import { StringLike, Value, ValueOf } from './Base';

export type DefaultThresholdInput = number | string | Date;

/**
 * Map scale type to D3Scale type
 * @type `Output`: Output type of all scales except point and band
 * @type `ThresholdInput`: Input type for threshold scale
 * @type `DiscreteInput`: Input type for ordinal, point and band scales
 */
export interface ScaleTypeToD3Scale<
  Output = Value,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput
> {
  // Input of these continuous scales are `number | { valueOf(): number }`
  // and cannot be customized via generic type.
  linear: ScaleLinear<Output, Output>;
  log: ScaleLogarithmic<Output, Output>;
  pow: ScalePower<Output, Output>;
  sqrt: ScalePower<Output, Output>;
  symlog: ScaleSymLog<Output, Output>;
  // Input of time scales are `Date | number | { valueOf(): number }`
  // and cannot be customized via generic type.
  time: ScaleTime<Output, Output>;
  utc: ScaleTime<Output, Output>;
  // Input of these discretizing scales are `number | { valueOf(): number }`
  // and cannot be customized via generic type.
  quantile: ScaleQuantile<Output>;
  quantize: ScaleQuantize<Output>;
  // Threshold scale has its own Input generic type.
  threshold: ScaleThreshold<ThresholdInput, Output>;
  // Ordinal scale can customize both Input and Output types.
  ordinal: ScaleOrdinal<DiscreteInput, Output>;
  // Output of these two scales are always number while Input can be customized.
  point: ScalePoint<DiscreteInput>;
  band: ScaleBand<DiscreteInput>;
}

export type PickD3Scale<
  T extends keyof ScaleTypeToD3Scale<Output, DiscreteInput, DefaultThresholdInput>,
  Output = Value,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput
> = ValueOf<Pick<ScaleTypeToD3Scale<Output, DiscreteInput, ThresholdInput>, T>>;

export type D3Scale<
  Output = Value,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput
> = ValueOf<ScaleTypeToD3Scale<Output, DiscreteInput, ThresholdInput>>;
