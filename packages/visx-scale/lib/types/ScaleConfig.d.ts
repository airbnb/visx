import { BaseScaleConfig } from './BaseScaleConfig';
import { StringLike, DefaultOutput, ValueOf, NumberLike } from './Base';
import { NiceTime } from './Nice';
import { DefaultThresholdInput, ScaleTypeToD3Scale } from './Scale';
declare type Numeric = number | NumberLike;
export declare type TimeInput = number | Date;
export declare type ContinuousInput = number | Date;
export declare type TimeDomain = TimeInput[];
export declare type ContinuousDomain = ContinuousInput[];
declare type CreateScaleConfig<T, D, R, Fields extends keyof BaseScaleConfig<T, D, R> = 'type'> = Pick<BaseScaleConfig<T, D, R>, 'type' | 'domain' | 'range' | 'reverse' | Fields>;
export declare type LinearScaleConfig<Output = DefaultOutput> = CreateScaleConfig<'linear', ContinuousDomain, Output[], 'clamp' | 'interpolate' | 'nice' | 'round' | 'zero'>;
export declare type LogScaleConfig<Output = DefaultOutput> = CreateScaleConfig<'log', ContinuousDomain, Output[], 'base' | 'clamp' | 'interpolate' | 'nice' | 'round'>;
export declare type PowScaleConfig<Output = DefaultOutput> = CreateScaleConfig<'pow', ContinuousDomain, Output[], 'clamp' | 'exponent' | 'interpolate' | 'nice' | 'round' | 'zero'>;
export declare type SqrtScaleConfig<Output = DefaultOutput> = CreateScaleConfig<'sqrt', ContinuousDomain, Output[], 'clamp' | 'interpolate' | 'nice' | 'round' | 'zero'>;
export declare type SymlogScaleConfig<Output = DefaultOutput> = CreateScaleConfig<'symlog', ContinuousDomain, Output[], 'clamp' | 'constant' | 'nice' | 'zero'>;
export declare type RadialScaleConfig<Output = DefaultOutput> = CreateScaleConfig<'radial', ContinuousDomain, Output[], 'clamp' | 'nice' | 'round' | 'unknown'>;
export declare type QuantileScaleConfig<Output = DefaultOutput> = CreateScaleConfig<'quantile', ContinuousDomain, Output[]>;
export declare type QuantizeScaleConfig<Output = DefaultOutput> = CreateScaleConfig<'quantize', [ContinuousInput, ContinuousInput], Output[], 'nice' | 'zero'>;
export declare type ThresholdScaleConfig<ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput, Output = DefaultOutput> = CreateScaleConfig<'threshold', ThresholdInput[], Output[]>;
export declare type OrdinalScaleConfig<DiscreteInput extends StringLike = StringLike, Output = DefaultOutput> = CreateScaleConfig<'ordinal', DiscreteInput[], Output[], 'unknown'>;
export declare type PointScaleConfig<DiscreteInput extends StringLike = StringLike> = CreateScaleConfig<'point', DiscreteInput[], [Numeric, Numeric], 'align' | 'padding' | 'round'>;
export declare type BandScaleConfig<DiscreteInput extends StringLike = StringLike> = CreateScaleConfig<'band', DiscreteInput[], [Numeric, Numeric], 'align' | 'padding' | 'paddingInner' | 'paddingOuter' | 'round'>;
interface TemporalScaleConfig<T, Output = DefaultOutput> extends CreateScaleConfig<T, TimeDomain, Output[], 'clamp' | 'interpolate' | 'round'> {
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
    nice?: boolean | number | NiceTime | {
        interval: NiceTime;
        step: number;
    };
}
export declare type TimeScaleConfig<Output = DefaultOutput> = TemporalScaleConfig<'time', Output>;
export declare type UtcScaleConfig<Output = DefaultOutput> = TemporalScaleConfig<'utc', Output>;
/**
 * Map scale type to D3Scale type
 * @type `Output`: Output type of all scales except point and band
 * @type `ThresholdInput`: Input type for threshold scale
 * @type `DiscreteInput`: Input type for ordinal, point and band scales
 */
export interface ScaleTypeToScaleConfig<Output = DefaultOutput, DiscreteInput extends StringLike = StringLike, ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput> {
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
export declare type ScaleType = keyof ScaleTypeToScaleConfig;
/** Scales that take time as domains */
export declare type TimeScaleType = 'time' | 'utc';
/** Scales that take continuous domains and return continuous ranges */
export declare type ContinuousScaleType = 'linear' | 'log' | 'pow' | 'sqrt' | 'symlog' | 'radial' | TimeScaleType;
/** Scales that convert continuous domains to discrete ranges */
export declare type DiscretizingScaleType = 'quantile' | 'quantize' | 'threshold';
/** Scales that take discrete domains and return discrete ranges */
export declare type DiscreteScaleType = 'ordinal' | 'point' | 'band';
/** Scales that take continuous domains */
export declare type ContinuousDomainScaleType = ContinuousScaleType | DiscretizingScaleType;
export declare type PickScaleConfig<T extends ScaleType, Output = DefaultOutput, DiscreteInput extends StringLike = StringLike, ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput> = ValueOf<Pick<ScaleTypeToScaleConfig<Output, DiscreteInput, ThresholdInput>, T>>;
declare type OmitType<T> = {
    [key in keyof T]: Omit<T[key], 'type'>;
};
export declare type PickScaleConfigWithoutType<T extends ScaleType, Output = DefaultOutput, DiscreteInput extends StringLike = StringLike, ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput> = ValueOf<Pick<OmitType<ScaleTypeToScaleConfig<Output, DiscreteInput, ThresholdInput>>, T>>;
export declare type ScaleConfig<Output = DefaultOutput, DiscreteInput extends StringLike = StringLike, ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput> = ValueOf<ScaleTypeToScaleConfig<Output, DiscreteInput, ThresholdInput>>;
export declare type ScaleConfigWithoutType<Output = DefaultOutput, DiscreteInput extends StringLike = StringLike, ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput> = PickScaleConfigWithoutType<ScaleType, Output, DiscreteInput, ThresholdInput>;
export declare type ScaleConfigToD3Scale<Config extends ScaleConfig<Output, DiscreteInput, ThresholdInput>, Output = DefaultOutput, DiscreteInput extends StringLike = StringLike, ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput> = ScaleTypeToD3Scale<Output, DiscreteInput, ThresholdInput>[Config['type']];
export {};
//# sourceMappingURL=ScaleConfig.d.ts.map