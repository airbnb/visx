import React from 'react';
import type { AxisScale } from '@visx/axis/lib/types';
import type { BaseAreaStackProps } from './private/BaseAreaStack';
import BaseAreaStack from './private/BaseAreaStack';

export default function AreaStack<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
>(props: Omit<BaseAreaStackProps<XScale, YScale, Datum>, 'PathComponent'>) {
  return <BaseAreaStack<XScale, YScale, Datum> {...props} />;
}
