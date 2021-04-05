import { AxisScale } from '@visx/axis';
import { NearestDatumArgs, NearestDatumReturnType } from '../types';
export default function findNearestDatumX<XScale extends AxisScale, YScale extends AxisScale, Datum extends object>({ xScale: scale, xAccessor: accessor, yScale, yAccessor, point, data, }: NearestDatumArgs<XScale, YScale, Datum>): NearestDatumReturnType<Datum>;
//# sourceMappingURL=findNearestDatumX.d.ts.map