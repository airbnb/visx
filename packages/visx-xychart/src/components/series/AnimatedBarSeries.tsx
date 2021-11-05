import { AxisScale } from '@visx/axis';
import React from 'react';
import BaseBarSeries, { BaseBarSeriesProps } from './private/BaseBarSeries';
import AnimatedBars from './private/AnimatedBars';

export default function AnimatedBarSeries<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
>({ colorAccessor, ...props }: Omit<BaseBarSeriesProps<XScale, YScale, Datum>, 'BarsComponent'>) {
  return (
    <BaseBarSeries<XScale, YScale, Datum>
      {...props}
      // @TODO currently generics for non-SeriesProps are not passed correctly in
      // withRegisteredData HOC
      colorAccessor={colorAccessor as BaseBarSeriesProps<XScale, YScale, object>['colorAccessor']}
      BarsComponent={AnimatedBars}
    />
  );
}
