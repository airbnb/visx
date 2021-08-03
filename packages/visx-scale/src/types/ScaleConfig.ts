import { BaseScaleConfig } from './BaseScaleConfig';
import { StringLike, DefaultOutput, ValueOf, NumberLike } from './Base';
import { NiceTime } from './Nice';
import { DefaultThresholdInput, ScaleTypeToD3Scale } from './Scale';

type Numeric = number | NumberLike;

export type TimeInput = number | Date;
export type ContinuousInput = number | Date;

export type TimeDomain = TimeInput[];
export type ContinuousDomain = ContinuousInput[];

// Make the specific scales pick
// from same base type to share property documentation
// (which is useful for auto-complete/intellisense)
// and add `type` property as discriminant of union type.
type CreateScaleConfig<T, D, R, Fields extends keyof BaseScaleConfig<T, D, R> = 'type'> = Pick<
  BaseScaleConfig<T, D, R>,
  'type' | 'domain' | 'range' | 'reverse' | Fields
>;

export type LinearScaleConfig<Output = DefaultOutput> = CreateScaleConfig<
  'linear',
  ContinuousDomain,
  Output[],
  'clamp' | 'interpolate' | 'nice' | 'round' | 'zero'
>;

export type LogScaleConfig<Output = DefaultOutput> = CreateScaleConfig<
  'log',
  ContinuousDomain,
  Output[],
  'base' | 'clamp' | 'interpolate' | 'nice' | 'round'
>;

export type PowScaleConfig<Output = DefaultOutput> = CreateScaleConfig<
  'pow',
  ContinuousDomain,
  Output[],
  'clamp' | 'exponent' | 'interpolate' | 'nice' | 'round' | 'zero'
>;

export type SqrtScaleConfig<Output = DefaultOutput> = CreateScaleConfig<
  'sqrt',
  ContinuousDomain,
  Output[],
  'clamp' | 'interpolate' | 'nice' | 'round' | 'zero'
>;

export type SymlogScaleConfig<Output = DefaultOutput> = CreateScaleConfig<
  'symlog',
  ContinuousDomain,
  Output[],
  'clamp' | 'constant' | 'nice' | 'round' | 'zero'
>;

export type RadialScaleConfig<Output = DefaultOutput> = CreateScaleConfig<
  'radial',
  ContinuousDomain,
  Output[],
  'clamp' | 'nice' | 'round' | 'unknown'
>;

export type QuantileScaleConfig<Output = DefaultOutput> = CreateScaleConfig<
  'quantile',
  ContinuousDomain,
  Output[]
>;

export type QuantizeScaleConfig<Output = DefaultOutput> = CreateScaleConfig<
  'quantize',
  [ContinuousInput, ContinuousInput],
  Output[],
  'nice' | 'zero'
>;

export type ThresholdScaleConfig<
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
  Output = DefaultOutput,
> = CreateScaleConfig<'threshold', ThresholdInput[], Output[]>;

export type OrdinalScaleConfig<
  DiscreteInput extends StringLike = StringLike,
  Output = DefaultOutput,
> = CreateScaleConfig<'ordinal', DiscreteInput[], Output[], 'unknown'>;

export type PointScaleConfig<DiscreteInput extends StringLike = StringLike> = CreateScaleConfig<
  'point',
  DiscreteInput[],
  [Numeric, Numeric],
  'align' | 'padding' | 'round'
>;

export type BandScaleConfig<DiscreteInput extends StringLike = StringLike> = CreateScaleConfig<
  'band',
  DiscreteInput[],
  [Numeric, Numeric],
  'align' | 'padding' | 'paddingInner' | 'paddingOuter' | 'round'
>;

interface TemporalScaleConfig<T, Output = DefaultOutput>
  extends CreateScaleConfig<T, TimeDomain, Output[], 'clamp' | 'interpolate' | 'round'> {
  /**
   * Extending the domain so that it starts and ends on nice round values. This method typically modifies the scale’s domain, and may only extend the bounds to the nearest round value. Nicing is useful if the domain is computed from data and may be irregular. For example, for a domain of _[0.201479…, 0.996679…]_, a nice domain might be _[0.2, 1.0]_.
   *
   * For quantitative scales such as linear, `nice` can be either a boolean flag or a number. If `nice` is a number, it will represent a desired tick count. This allows greater control over the step size used to extend the bounds, guaranteeing that the returned ticks will exactly cover the domain.
   *
   * For temporal fields with time and utc scales, the `nice` value can be a string indicating the desired time interval. Legal values are `"millisecond"`, `"second"`, `"minute"`, `"hour"`, `"day"`, `"week"`, `"month"`, and `"year"`. Alternatively, `time` and `utc` scales can accept an object-valued interval specifier of the form `{"interval": "month", "step": 3}`, which includes a desired number of interval steps. Here, the domain would snap to quarter (Jan, Apr, Jul, Oct) boundaries.
   *
   * __Default value:__ `true` for unbinned _quantitative_ fields; `false` otherwise.
   *
   */
  nice?: boolean | number | NiceTime | { interval: NiceTime; step: number };
}

export type TimeScaleConfig<Output = DefaultOutput> = TemporalScaleConfig<'time', Output>;

export type UtcScaleConfig<Output = DefaultOutput> = TemporalScaleConfig<'utc', Output>;

/**
 * Map scale type to D3Scale type
 * @type `Output`: Output type of all scales except point and band
 * @type `ThresholdInput`: Input type for threshold scale
 * @type `DiscreteInput`: Input type for ordinal, point and band scales
 */
export interface ScaleTypeToScaleConfig<
  Output = DefaultOutput,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
> {
  linear: LinearScaleConfig<Output>;
  log: LogScaleConfig<Output>;
  pow: PowScaleConfig<Output>;
  sqrt: SqrtScaleConfig<Output>;
  symlog: SymlogScaleConfig<Output>;
  radial: RadialScaleConfig<Output>;
  time: TimeScaleConfig<Output>;
  utc: UtcScaleConfig<Output>;
  quantile: QuantileScaleConfig<Output>;
  quantize: QuantizeScaleConfig<Output>;
  threshold: ThresholdScaleConfig<ThresholdInput, Output>;
  ordinal: OrdinalScaleConfig<DiscreteInput, Output>;
  point: PointScaleConfig<DiscreteInput>;
  band: BandScaleConfig<DiscreteInput>;
}

/** All scale types */
export type ScaleType = keyof ScaleTypeToScaleConfig;

/** Scales that take time as domains */
export type TimeScaleType = 'time' | 'utc';

/** Scales that take continuous domains and return continuous ranges */
export type ContinuousScaleType =
  | 'linear'
  | 'log'
  | 'pow'
  | 'sqrt'
  | 'symlog'
  | 'radial'
  | TimeScaleType;
/** Scales that convert continuous domains to discrete ranges */
export type DiscretizingScaleType = 'quantile' | 'quantize' | 'threshold';
/** Scales that take discrete domains and return discrete ranges */
export type DiscreteScaleType = 'ordinal' | 'point' | 'band';

/** Scales that take continuous domains */
export type ContinuousDomainScaleType = ContinuousScaleType | DiscretizingScaleType;

export type PickScaleConfig<
  T extends ScaleType,
  Output = DefaultOutput,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
> = ValueOf<Pick<ScaleTypeToScaleConfig<Output, DiscreteInput, ThresholdInput>, T>>;

type OmitType<T> = {
  [key in keyof T]: Omit<T[key], 'type'>;
};

export type PickScaleConfigWithoutType<
  T extends ScaleType,
  Output = DefaultOutput,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
> = ValueOf<Pick<OmitType<ScaleTypeToScaleConfig<Output, DiscreteInput, ThresholdInput>>, T>>;

export type ScaleConfig<
  Output = DefaultOutput,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
> = ValueOf<ScaleTypeToScaleConfig<Output, DiscreteInput, ThresholdInput>>;

export type ScaleConfigWithoutType<
  Output = DefaultOutput,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
> = PickScaleConfigWithoutType<ScaleType, Output, DiscreteInput, ThresholdInput>;

export type ScaleConfigToD3Scale<
  Config extends ScaleConfig<Output, DiscreteInput, ThresholdInput>,
  Output = DefaultOutput,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
> = ScaleTypeToD3Scale<Output, DiscreteInput, ThresholdInput>[Config['type']];
