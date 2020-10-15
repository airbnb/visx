import { AxisScale } from '@visx/axis';
import React from 'react';
import BaseAreaSeries, { BaseAreaSeriesProps } from './private/BaseAreaSeries';

export default function AreaSeries<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object
>({ ...props }: Omit<BaseAreaSeriesProps<XScale, YScale, Datum>, 'PathComponent'>) {
  return <BaseAreaSeries<XScale, YScale, Datum> {...props} />;
}
