/// <reference types="react" />
import { PositionScale } from '@visx/shape/lib/types';
import { BaseBarGroupProps } from './private/BaseBarGroup';
export default function BarGroup<XScale extends PositionScale, YScale extends PositionScale, Datum extends object>(props: Omit<BaseBarGroupProps<XScale, YScale, Datum>, 'BarsComponent'>): JSX.Element;
//# sourceMappingURL=BarGroup.d.ts.map