import React from 'react';
import type { AxisScale } from '@visx/axis/lib/types';
import type { BaseAreaStackProps } from './private/BaseAreaStack';
import BaseAreaStack from './private/BaseAreaStack';
import AnimatedPath from './private/AnimatedPath';

export default function AnimatedAreaStack<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
>(props: Omit<BaseAreaStackProps<XScale, YScale, Datum>, 'PathComponent'>) {
  return <BaseAreaStack<XScale, YScale, Datum> {...props} PathComponent={AnimatedPath} />;
}
