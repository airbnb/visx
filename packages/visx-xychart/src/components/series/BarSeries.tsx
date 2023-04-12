import { AxisScale } from '@visx/axis';
import React from 'react';
import BaseBarSeries, { BaseBarSeriesProps } from './private/BaseBarSeries';
import { BarSeriesProps } from '../../types';

export function BarSeries<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
>({ colorAccessor, ...props }: Omit<BarSeriesProps<XScale, YScale, Datum>, 'BarsComponent'>) {
  return (
    <BaseBarSeries<XScale, YScale, Datum>
      {...props}
      // @TODO currently generics for non-SeriesProps are not passed correctly in
      // withRegisteredData HOC
      colorAccessor={colorAccessor as BaseBarSeriesProps<XScale, YScale, object>['colorAccessor']}
    />
  );
}

export default BarSeries;
