import React from 'react';
import { AxisScale } from '@visx/axis/lib/types';
import BaseAreaStack, { BaseAreaStackProps } from './private/BaseAreaStack';

export default function AreaStack<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
>(props: Omit<BaseAreaStackProps<XScale, YScale, Datum>, 'PathComponent'>) {
  return <BaseAreaStack<XScale, YScale, Datum> {...props} />;
}
