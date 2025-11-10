import type { PositionScale } from '@visx/shape';
import type { BaseBarStackProps } from './private/BaseBarStack';
import BaseBarStack from './private/BaseBarStack';
import AnimatedBars from './private/AnimatedBars';

export default function AnimatedBarStack<
  XScale extends PositionScale,
  YScale extends PositionScale,
  Datum extends object,
>(props: Omit<BaseBarStackProps<XScale, YScale, Datum>, 'BarsComponent'>) {
  return <BaseBarStack<XScale, YScale, Datum> {...props} BarsComponent={AnimatedBars} />;
}
