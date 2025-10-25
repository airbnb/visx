import type { AxisScale } from '@visx/axis';
import React from 'react';
import type { BaseAreaSeriesProps } from './private/BaseAreaSeries';
import BaseAreaSeries from './private/BaseAreaSeries';

export default function AreaSeries<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
>(props: Omit<BaseAreaSeriesProps<XScale, YScale, Datum>, 'PathComponent'>) {
  return <BaseAreaSeries<XScale, YScale, Datum> {...props} />;
}
