import { BaseScaleConfig } from './BaseScaleConfig';
import { StringLike, Value, ValueOf, NumberLike } from './Base';
import { NiceTime } from './Nice';

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

export type LinearScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'linear',
  ContinuousDomain,
  Output[],
  'clamp' | 'interpolate' | 'nice' | 'round' | 'zero'
>;

export type LogScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'log',
  ContinuousDomain,
  Output[],
  'base' | 'clamp' | 'interpolate' | 'nice' | 'round'
>;

export type PowScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'pow',
  ContinuousDomain,
  Output[],
  'clamp' | 'exponent' | 'interpolate' | 'nice' | 'round' | 'zero'
>;

export type SqrtScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'sqrt',
  ContinuousDomain,
  Output[],
  'clamp' | 'interpolate' | 'nice' | 'round' | 'zero'
>;

export type SymlogScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'symlog',
  ContinuousDomain,
  Output[],
  'clamp' | 'constant' | 'nice' | 'round' | 'zero'
>;

export type QuantileScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'quantile',
  ContinuousDomain,
  Output[],
  'interpolate'
>;

export type QuantizeScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'quantize',
  [ContinuousInput, ContinuousInput],
  Output[],
  'interpolate' | 'nice' | 'zero'
>;

export type ThresholdScaleConfig<
  ThresholdInput extends number | string | Date = number | string | Date,
  Output extends Value = Value
> = CreateScaleConfig<'threshold', ThresholdInput[], Output[]>;

export type OrdinalScaleConfig<
  DiscreteInput extends StringLike = StringLike,
  Output extends Value = Value
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

interface TemporalScaleConfig<T, Output extends Value = Value>
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

export type TimeScaleConfig<Output extends Value = Value> = TemporalScaleConfig<'time', Output>;

export type UtcScaleConfig<Output extends Value = Value> = TemporalScaleConfig<'utc', Output>;

export interface ScaleTypeToScaleConfig<
  Output extends Value = Value,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends number | string | Date = number | string | Date
> {
  linear: LinearScaleConfig<Output>;
  log: LogScaleConfig<Output>;
  pow: PowScaleConfig<Output>;
  sqrt: SqrtScaleConfig<Output>;
  symlog: SymlogScaleConfig<Output>;
  time: TimeScaleConfig<Output>;
  utc: UtcScaleConfig<Output>;
  quantile: QuantileScaleConfig<Output>;
  quantize: QuantizeScaleConfig<Output>;
  threshold: ThresholdScaleConfig<ThresholdInput, Output>;
  ordinal: OrdinalScaleConfig<DiscreteInput, Output>;
  point: PointScaleConfig<DiscreteInput>;
  band: BandScaleConfig<DiscreteInput>;
}

export type PickScaleConfig<
  T extends keyof ScaleTypeToScaleConfig<Output, DiscreteInput, ThresholdInput>,
  Output extends Value = Value,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends number | string | Date = number | string | Date
> = ValueOf<Pick<ScaleTypeToScaleConfig<Output, DiscreteInput, ThresholdInput>, T>>;

export type PickScaleConfigWithoutType<
  T extends keyof ScaleTypeToScaleConfig<Output, DiscreteInput, ThresholdInput>,
  Output extends Value = Value,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends number | string | Date = number | string | Date
> = Omit<PickScaleConfig<T, Output, DiscreteInput, ThresholdInput>, 'type'>;

export type ScaleConfig<
  Output extends Value = Value,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends number | string | Date = number | string | Date
> = ValueOf<ScaleTypeToScaleConfig<Output, DiscreteInput, ThresholdInput>>;

export type ScaleType = keyof ScaleTypeToScaleConfig;
