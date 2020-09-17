import { AxisScale } from '@visx/axis';
import { ScaleInput } from '@visx/scale';

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
