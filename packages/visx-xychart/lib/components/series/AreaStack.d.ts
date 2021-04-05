/// <reference types="react" />
import { AxisScale } from '@visx/axis/lib/types';
import { BaseAreaStackProps } from './private/BaseAreaStack';
export default function AreaStack<XScale extends AxisScale, YScale extends AxisScale, Datum extends object>(props: Omit<BaseAreaStackProps<XScale, YScale, Datum>, 'PathComponent'>): JSX.Element;
//# sourceMappingURL=AreaStack.d.ts.map