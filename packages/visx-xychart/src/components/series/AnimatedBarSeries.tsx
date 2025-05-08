import { AxisScale } from '@visx/axis';
import React from 'react';
import BaseBarSeries, { BaseBarSeriesProps } from './private/BaseBarSeries';
import AnimatedBars from './private/AnimatedBars';

export default function AnimatedBarSeries<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
>({
  colorAccessor,
  radius,
  radiusAll,
  radiusTop,
  radiusRight,
  radiusBottom,
  radiusLeft,
  ...props
}: Omit<BaseBarSeriesProps<XScale, YScale, Datum>, 'BarsComponent'>) {
  return (
    <BaseBarSeries<XScale, YScale, Datum>
      {...props}
      // @TODO currently generics for non-SeriesProps are not passed correctly in
      // withRegisteredData HOC
      colorAccessor={colorAccessor as BaseBarSeriesProps<XScale, YScale, object>['colorAccessor']}
      radius={radius as BaseBarSeriesProps<XScale, YScale, object>['radius']}
      radiusAll={radiusAll as BaseBarSeriesProps<XScale, YScale, object>['radiusAll']}
      radiusTop={radiusTop as BaseBarSeriesProps<XScale, YScale, object>['radiusTop']}
      radiusRight={radiusRight as BaseBarSeriesProps<XScale, YScale, object>['radiusRight']}
      radiusBottom={radiusBottom as BaseBarSeriesProps<XScale, YScale, object>['radiusBottom']}
      BarsComponent={AnimatedBars}
    />
  );
}
