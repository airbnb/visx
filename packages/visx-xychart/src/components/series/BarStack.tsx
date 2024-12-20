import React from 'react';
import type { PositionScale } from '@visx/shape/lib/types';
import type { BaseBarStackProps } from './private/BaseBarStack';
import BaseBarStack from './private/BaseBarStack';
import Bars from './private/Bars';

export default function BarStack<
  XScale extends PositionScale,
  YScale extends PositionScale,
  Datum extends object,
>(props: Omit<BaseBarStackProps<XScale, YScale, Datum>, 'BarsComponent'>) {
  return <BaseBarStack<XScale, YScale, Datum> {...props} BarsComponent={Bars} />;
}
