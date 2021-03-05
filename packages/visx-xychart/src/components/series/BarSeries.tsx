import { AxisScale } from '@visx/axis';
import React from 'react';
import BaseBarSeries, { BaseBarSeriesProps } from './private/BaseBarSeries';
import Bars from './private/Bars';

function BarSeries<XScale extends AxisScale, YScale extends AxisScale, Datum extends object>({
  colorAccessor,
  ...props
}: BaseBarSeriesProps<XScale, YScale, Datum>) {
  return (
    <BaseBarSeries<XScale, YScale, Datum>
      {...props}
      // @TODO currently generics for non-SeriesProps are not passed correctly in
      // withRegisteredData HOC
      colorAccessor={colorAccessor as BaseBarSeriesProps<XScale, YScale, object>['colorAccessor']}
      BarsComponent={Bars}
    />
  );
}

export default BarSeries;
