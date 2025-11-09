import type { AxisScale } from '@visx/axis';
import type { BaseBarSeriesProps } from './private/BaseBarSeries';
import BaseBarSeries from './private/BaseBarSeries';
import AnimatedBars from './private/AnimatedBars';

export default function AnimatedBarSeries<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
>({ colorAccessor, ...props }: Omit<BaseBarSeriesProps<XScale, YScale, Datum>, 'BarsComponent'>) {
  return (
    <BaseBarSeries<XScale, YScale, Datum>
      {...props}
      colorAccessor={colorAccessor as BaseBarSeriesProps<XScale, YScale, object>['colorAccessor']}
      BarsComponent={AnimatedBars}
    />
  );
}
