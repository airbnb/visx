/// <reference types="react" />
import { AxisScale } from '@visx/axis';
import { BaseBarSeriesProps } from './private/BaseBarSeries';
export default function AnimatedBarSeries<XScale extends AxisScale, YScale extends AxisScale, Datum extends object>({ colorAccessor, ...props }: Omit<BaseBarSeriesProps<XScale, YScale, Datum>, 'BarsComponent'>): JSX.Element;
//# sourceMappingURL=AnimatedBarSeries.d.ts.map