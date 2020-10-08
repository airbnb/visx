import { AxisScale } from '@visx/axis';
import { ScaleInput } from '@visx/scale';
import { Series, SeriesPoint } from 'd3-shape';

export type SeriesProps<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object
> = {
  /** Required data key for the Series, should be unique across all series. */
  dataKey: string;
  /** Data for the Series. */
  data: Datum[];
  /** Given a Datum, returns the x-scale value. */
  xAccessor: (d: Datum) => ScaleInput<XScale>;
  /** Given a Datum, returns the y-scale value. */
  yAccessor: (d: Datum) => ScaleInput<YScale>;
};

// BarStack transforms its child series Datum into CombinedData<XScale, YScale>
export type BarStackDatum<XScale extends AxisScale, YScale extends AxisScale> = SeriesPoint<
  CombinedStackData<XScale, YScale>
>;

export type BarStackData<XScale extends AxisScale, YScale extends AxisScale> = Series<
  CombinedStackData<XScale, YScale>,
  string
>[];

export type CombinedStackData<XScale extends AxisScale, YScale extends AxisScale> = {
  [dataKey: string]: ScaleInput<XScale> | ScaleInput<YScale>;
} & { stack: ScaleInput<XScale> | ScaleInput<YScale>; positiveSum: number; negativeSum: number };
