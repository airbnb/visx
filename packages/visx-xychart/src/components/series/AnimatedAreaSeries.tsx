import type { AxisScale } from '@visx/axis';
import AnimatedPath from './private/AnimatedPath';
import type { BaseAreaSeriesProps } from './private/BaseAreaSeries';
import BaseAreaSeries from './private/BaseAreaSeries';

export default function AnimatedAreaSeries<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
>(props: Omit<BaseAreaSeriesProps<XScale, YScale, Datum>, 'PathComponent'>) {
  return <BaseAreaSeries<XScale, YScale, Datum> {...props} PathComponent={AnimatedPath} />;
}
