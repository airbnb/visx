/// <reference types="react" />
import { AxisScale } from '@visx/axis';
import { BaseBarSeriesProps } from './private/BaseBarSeries';
declare function BarSeries<XScale extends AxisScale, YScale extends AxisScale, Datum extends object>({ colorAccessor, ...props }: Omit<BaseBarSeriesProps<XScale, YScale, Datum>, 'BarsComponent'>): JSX.Element;
export default BarSeries;
//# sourceMappingURL=BarSeries.d.ts.map