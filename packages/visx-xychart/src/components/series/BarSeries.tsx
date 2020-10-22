import { AxisScale } from '@visx/axis';
import React from 'react';
import BaseBarSeries, { BaseBarSeriesProps } from './private/BaseBarSeries';
import Bars from './private/Bars';

function BarSeries<XScale extends AxisScale, YScale extends AxisScale, Datum extends object>({
  ...props
}: Omit<BaseBarSeriesProps<XScale, YScale, Datum>, 'BarsComponent'>) {
  return <BaseBarSeries<XScale, YScale, Datum> {...props} BarsComponent={Bars} />;
}

export default BarSeries;
