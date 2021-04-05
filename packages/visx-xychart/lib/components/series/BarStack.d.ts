/// <reference types="react" />
import { PositionScale } from '@visx/shape/lib/types';
import { BaseBarStackProps } from './private/BaseBarStack';
export default function BarStack<XScale extends PositionScale, YScale extends PositionScale, Datum extends object>(props: Omit<BaseBarStackProps<XScale, YScale, Datum>, 'BarsComponent'>): JSX.Element;
//# sourceMappingURL=BarStack.d.ts.map