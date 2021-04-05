import { AxisScale } from '@visx/axis';
import { NearestDatumArgs, NearestDatumReturnType } from '../types';
export default function findNearestDatumY<XScale extends AxisScale, YScale extends AxisScale, Datum extends object>({ yScale: scale, yAccessor: accessor, xScale, xAccessor, point, data, }: NearestDatumArgs<XScale, YScale, Datum>): NearestDatumReturnType<Datum>;
//# sourceMappingURL=findNearestDatumY.d.ts.map