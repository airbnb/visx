/// <reference types="react" />
import { AxisScale } from '@visx/axis';
import { BaseAreaSeriesProps } from './private/BaseAreaSeries';
export default function AreaSeries<XScale extends AxisScale, YScale extends AxisScale, Datum extends object>(props: Omit<BaseAreaSeriesProps<XScale, YScale, Datum>, 'PathComponent'>): JSX.Element;
//# sourceMappingURL=AreaSeries.d.ts.map