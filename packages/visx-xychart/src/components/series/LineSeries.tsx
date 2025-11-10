import type { AxisScale } from '@visx/axis';
import type { BaseLineSeriesProps } from './private/BaseLineSeries';
import BaseLineSeries from './private/BaseLineSeries';

export default function LineSeries<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
>(props: Omit<BaseLineSeriesProps<XScale, YScale, Datum>, 'PathComponent'>) {
  return <BaseLineSeries<XScale, YScale, Datum> {...props} />;
}
