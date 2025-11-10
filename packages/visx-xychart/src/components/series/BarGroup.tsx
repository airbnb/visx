import type { PositionScale } from '@visx/shape';
import type { BaseBarGroupProps } from './private/BaseBarGroup';
import BaseBarGroup from './private/BaseBarGroup';
import Bars from './private/Bars';

export default function BarGroup<
  XScale extends PositionScale,
  YScale extends PositionScale,
  Datum extends object,
>(props: Omit<BaseBarGroupProps<XScale, YScale, Datum>, 'BarsComponent'>) {
  return <BaseBarGroup<XScale, YScale, Datum> {...props} BarsComponent={Bars} />;
}
