import { AxisScale } from '@visx/axis';
import React from 'react';
import BaseLineSeries, { BaseLineSeriesProps } from './private/BaseLineSeries';

export default function LineSeries<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
>(props: Omit<BaseLineSeriesProps<XScale, YScale, Datum>, 'PathComponent'>) {
  return <BaseLineSeries<XScale, YScale, Datum> {...props} />;
}
