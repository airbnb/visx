/// <reference types="react" />
import { AxisScale } from '@visx/axis';
import { BaseLineSeriesProps } from './private/BaseLineSeries';
export default function LineSeries<XScale extends AxisScale, YScale extends AxisScale, Datum extends object>(props: Omit<BaseLineSeriesProps<XScale, YScale, Datum>, 'PathComponent'>): JSX.Element;
//# sourceMappingURL=LineSeries.d.ts.map