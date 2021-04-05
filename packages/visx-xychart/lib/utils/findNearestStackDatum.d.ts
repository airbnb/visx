import { AxisScale } from '@visx/axis';
import { BarStackDatum, NearestDatumArgs } from '../types';
/**
 * This is a wrapper around findNearestDatumX/Y for BarStack, accounting for a
 * Bar's d0 and d1, not just d1 (which findNearestDatum uses). Additionally,
 * returns the BarSeries original `Datum`, not the `BarStackDatum` so
 * Tooltip typing is correct.
 */
export default function findNearestStackDatum<XScale extends AxisScale, YScale extends AxisScale, Datum extends object>(nearestDatumArgs: NearestDatumArgs<XScale, YScale, BarStackDatum<XScale, YScale>>, seriesData: Datum[], horizontal?: boolean): {
    index: number;
    datum: Datum;
    distanceX: number;
    distanceY: number;
} | null;
//# sourceMappingURL=findNearestStackDatum.d.ts.map