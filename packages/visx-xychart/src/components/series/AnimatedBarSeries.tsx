import { AxisScale } from '@visx/axis';
import React from 'react';
import BaseBarSeries, { BaseBarSeriesProps } from './BaseBarSeries';
import AnimatedBars from './AnimatedBars';

function AnimatedBarSeries<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object
>({ ...props }: Omit<BaseBarSeriesProps<XScale, YScale, Datum>, 'BarsComponent'>) {
  return <BaseBarSeries<XScale, YScale, Datum> {...props} BarsComponent={AnimatedBars} />;
}

export default AnimatedBarSeries;
