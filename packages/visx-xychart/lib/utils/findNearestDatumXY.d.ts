import { AxisScale } from '@visx/axis';
import { NearestDatumArgs, NearestDatumReturnType } from '../types';
export default function findNearestDatumXY<XScale extends AxisScale, YScale extends AxisScale, Datum extends object>({ width, height, xScale, yScale, xAccessor, yAccessor, point, data, }: NearestDatumArgs<XScale, YScale, Datum>): NearestDatumReturnType<Datum>;
//# sourceMappingURL=findNearestDatumXY.d.ts.map