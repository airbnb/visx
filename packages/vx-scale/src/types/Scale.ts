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
import { HasToString, Value, ValueOf } from './Base';

export interface ScaleTypeToD3Scale<Output extends Value = Value> {
  linear: ScaleLinear<Output, Output>;
  log: ScaleLogarithmic<Output, Output>;
  pow: ScalePower<Output, Output>;
  sqrt: ScalePower<Output, Output>;
  symlog: ScaleSymLog<Output, Output>;
  time: ScaleTime<Output, Output>;
  utc: ScaleTime<Output, Output>;
  quantile: ScaleQuantile<Output>;
  quantize: ScaleQuantize<Output>;
  threshold: ScaleThreshold<number | string | Date, Output>;
  ordinal: ScaleOrdinal<HasToString, Output>;
  point: ScalePoint<HasToString>;
  band: ScaleBand<HasToString>;
}

export type PickD3Scale<
  T extends keyof ScaleTypeToD3Scale<Output>,
  Output extends Value = Value
> = ValueOf<Pick<ScaleTypeToD3Scale<Output>, T>>;

export type D3Scale<Output extends Value = Value> = ValueOf<ScaleTypeToD3Scale<Output>>;
