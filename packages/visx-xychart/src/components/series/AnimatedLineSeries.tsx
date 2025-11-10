import type { AxisScale } from '@visx/axis';
import type { BaseLineSeriesProps } from './private/BaseLineSeries';
import BaseLineSeries from './private/BaseLineSeries';
import AnimatedPath from './private/AnimatedPath';

export default function AnimatedLineSeries<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
>(props: Omit<BaseLineSeriesProps<XScale, YScale, Datum>, 'PathComponent'>) {
  return <BaseLineSeries<XScale, YScale, Datum> {...props} PathComponent={AnimatedPath} />;
}
