import { AxisScale } from '@visx/axis';
import { ScaleInput } from '@visx/scale';
import { Emitter } from 'mitt';

export type EventEmitterContextType = Emitter;

/** Arguments for findNearestDatum* functions. */
export type NearestDatumArgs<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
> = {
  dataKey: string;
  point: { x: number; y: number } | null;
  xAccessor: (d: Datum) => ScaleInput<XScale>;
  yAccessor: (d: Datum) => ScaleInput<YScale>;
  data: Datum[];
  width: number;
  height: number;
  xScale: XScale;
  yScale: YScale;
};

/** Return type for nearestDatum* functions. */
export type NearestDatumReturnType<Datum extends object> = {
  datum: Datum;
  index: number;
  distanceX: number;
  distanceY: number;
} | null;
