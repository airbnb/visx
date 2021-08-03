import React from 'react';
import { PositionScale } from '@visx/shape/lib/types';
import BaseBarGroup, { BaseBarGroupProps } from './private/BaseBarGroup';
import AnimatedBars from './private/AnimatedBars';

export default function AnimatedBarGroup<
  XScale extends PositionScale,
  YScale extends PositionScale,
  Datum extends object,
>(props: Omit<BaseBarGroupProps<XScale, YScale, Datum>, 'BarsComponent'>) {
  return <BaseBarGroup<XScale, YScale, Datum> {...props} BarsComponent={AnimatedBars} />;
}
