import type { AxisScale } from '@visx/axis';
import type { BaseBarSeriesProps } from './private/BaseBarSeries';
import BaseBarSeries from './private/BaseBarSeries';
import Bars from './private/Bars';

function BarSeries<XScale extends AxisScale, YScale extends AxisScale, Datum extends object>({
  colorAccessor,
  ...props
}: Omit<BaseBarSeriesProps<XScale, YScale, Datum>, 'BarsComponent'>) {
  return (
    <BaseBarSeries<XScale, YScale, Datum>
      {...props}
      colorAccessor={colorAccessor}
      BarsComponent={Bars}
    />
  );
}

export default BarSeries;
