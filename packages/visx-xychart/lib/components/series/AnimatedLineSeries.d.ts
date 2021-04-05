/// <reference types="react" />
import { AxisScale } from '@visx/axis';
import { BaseLineSeriesProps } from './private/BaseLineSeries';
export default function AnimatedLineSeries<XScale extends AxisScale, YScale extends AxisScale, Datum extends object>(props: Omit<BaseLineSeriesProps<XScale, YScale, Datum>, 'PathComponent'>): JSX.Element;
//# sourceMappingURL=AnimatedLineSeries.d.ts.map