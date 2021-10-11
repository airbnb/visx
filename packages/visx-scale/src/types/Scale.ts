import {
  ScaleOrdinal,
  ScaleLinear,
  ScaleLogarithmic,
  ScalePower,
  ScaleRadial,
  ScaleTime,
  ScaleQuantile,
  ScaleQuantize,
  ScaleThreshold,
  ScalePoint,
  ScaleBand,
  ScaleSymLog,
} from 'd3-scale';
import { StringLike, DefaultOutput, ValueOf } from './Base';

export type DefaultThresholdInput = number | string | Date;

/**
 * Map scale type to D3Scale type
 * @type `Output`: Output type of all scales except point and band
 * @type `ThresholdInput`: Input type for threshold scale
 * @type `DiscreteInput`: Input type for ordinal, point and band scales
 */
export interface ScaleTypeToD3Scale<
  Output = DefaultOutput,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
> {
  // Input of these continuous scales are `number | { valueOf(): number }`
  // and cannot be customized via generic type.
  linear: ScaleLinear<Output, Output>;
  log: ScaleLogarithmic<Output, Output>;
  pow: ScalePower<Output, Output>;
  sqrt: ScalePower<Output, Output>;
  symlog: ScaleSymLog<Output, Output>;
  radial: ScaleRadial<Output, Output>;
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
  Output = DefaultOutput,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
> = ValueOf<Pick<ScaleTypeToD3Scale<Output, DiscreteInput, ThresholdInput>, T>>;

export type D3Scale<
  Output = DefaultOutput,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
> = ValueOf<ScaleTypeToD3Scale<Output, DiscreteInput, ThresholdInput>>;

/**
 * A catch-all type for all D3 scales.
 *
 * Use this instead of `D3Scale`
 * unless other generic types (`Output`, `DiscreteInput` and `ThresholdInput`)
 * are also included and passed to `D3Scale`.
 * Otherwise it may not match some scales (band, point, threshold) correctly and cause TS errors.
 *
 * Example error messages:
 * * "Type 'StringLike' is not assignable to type 'string'"
 * * "Type 'number' is not assignable to type 'DefaultThresholdInput'"
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyD3Scale = D3Scale<any, any, any>;

export type InferD3ScaleOutput<Scale extends AnyD3Scale> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Scale extends D3Scale<infer X, any, any> ? X : DefaultOutput;

export type InferD3ScaleDiscreteInput<Scale extends AnyD3Scale> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Scale extends D3Scale<any, infer X, any> ? X : StringLike;

export type InferD3ScaleThresholdInput<Scale extends AnyD3Scale> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Scale extends D3Scale<any, any, infer X> ? X : DefaultThresholdInput;

/** Get type of scale input from D3 scale */
export type ScaleInput<Scale extends AnyD3Scale> = Parameters<Scale>[0];
