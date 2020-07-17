import { BaseScaleConfig } from './BaseScaleConfig';
import { HasToString, Value, ValueOf } from './Base';
import { NiceTime } from './Nice';

export type TimeInput = string | number | Date;
export type ContinuousInput = number | Date;
export type DiscreteInput = HasToString;

export type TimeDomain = TimeInput[];
export type ContinuousDomain = ContinuousInput[];

// Make the specific scales pick
// from same base type to share property documentation
// (which is useful for auto-complete/intellisense)
// and add `type` property as discriminant of union type.
type CreateScaleConfig<T, R, D, Fields extends keyof BaseScaleConfig<T, R, D>> = Pick<
  BaseScaleConfig<T, R, D>,
  'type' | 'domain' | 'range' | 'reverse' | Fields
>;

export type LinearScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'linear',
  Output[],
  ContinuousDomain,
  'clamp' | 'interpolate' | 'nice' | 'round' | 'zero'
>;

export type LogScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'log',
  Output[],
  ContinuousDomain,
  'base' | 'clamp' | 'interpolate' | 'nice' | 'round'
>;

export type PowScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'pow',
  Output[],
  ContinuousDomain,
  'clamp' | 'exponent' | 'interpolate' | 'nice' | 'round' | 'zero'
>;

export type SqrtScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'sqrt',
  Output[],
  ContinuousDomain,
  'clamp' | 'interpolate' | 'nice' | 'round' | 'zero'
>;

export type SymlogScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'symlog',
  Output[],
  ContinuousDomain,
  'clamp' | 'constant' | 'nice' | 'round' | 'zero'
>;

export type QuantileScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'quantile',
  Output[],
  ContinuousDomain,
  'interpolate'
>;

export type QuantizeScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'quantize',
  Output[],
  ContinuousDomain,
  'interpolate' | 'nice' | 'zero'
>;

export type ThresholdScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'threshold',
  Output[],
  ContinuousDomain,
  'interpolate' | 'nice'
>;

export type OrdinalScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'ordinal',
  Output[],
  DiscreteInput[],
  'interpolate'
>;

export type PointScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'point',
  Output[],
  DiscreteInput[],
  'align' | 'padding' | 'round'
>;

export type BandScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'band',
  Output[],
  DiscreteInput[],
  'align' | 'padding' | 'paddingInner' | 'paddingOuter' | 'round'
>;

interface TemporalScaleConfig<T, Output extends Value = Value>
  extends CreateScaleConfig<T, Output[], TimeDomain, 'clamp' | 'interpolate' | 'round'> {
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

export interface ScaleTypeToScaleConfig<Output extends Value = Value> {
  linear: LinearScaleConfig<Output>;
  log: LogScaleConfig<Output>;
  pow: PowScaleConfig<Output>;
  sqrt: SqrtScaleConfig<Output>;
  symlog: SymlogScaleConfig<Output>;
  time: TimeScaleConfig<Output>;
  utc: UtcScaleConfig<Output>;
  quantile: QuantileScaleConfig<Output>;
  quantize: QuantizeScaleConfig<Output>;
  threshold: ThresholdScaleConfig<Output>;
  ordinal: OrdinalScaleConfig<Output>;
  point: PointScaleConfig<Output>;
  band: BandScaleConfig<Output>;
}

export type PickScaleConfig<
  T extends keyof ScaleTypeToScaleConfig<Output>,
  Output extends Value = Value
> = ValueOf<Pick<ScaleTypeToScaleConfig<Output>, T>>;

export type PickScaleConfigWithoutType<
  T extends keyof ScaleTypeToScaleConfig<Output>,
  Output extends Value = Value
> = Omit<PickScaleConfig<T, Output>, 'type'>;

export type ScaleConfig<Output extends Value = Value> = ValueOf<ScaleTypeToScaleConfig<Output>>;

export type ScaleType = keyof ScaleTypeToScaleConfig;
