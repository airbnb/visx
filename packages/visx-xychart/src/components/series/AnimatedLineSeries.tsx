import { AxisScale } from '@visx/axis';
import React from 'react';
import BaseLineSeries, { BaseLineSeriesProps } from './private/BaseLineSeries';
import AnimatedPath from './private/AnimatedPath';

export default function AnimatedLineSeries<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
>(props: Omit<BaseLineSeriesProps<XScale, YScale, Datum>, 'PathComponent'>) {
  return <BaseLineSeries<XScale, YScale, Datum> {...props} PathComponent={AnimatedPath} />;
}
