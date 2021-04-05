import { PositionScale } from '@visx/shape/lib/types';
import { ScaleTypeToD3Scale } from '@visx/scale';
import { NearestDatumArgs } from '../types';
/**
 * This is a wrapper around findNearestDatumX/Y for BarGroup, accounting for a
 * Bar's group scale offset (which findNearestDatum does not).
 */
export default function findNearestGroupDatum<XScale extends PositionScale, YScale extends PositionScale, Datum extends object>(nearestDatumArgs: NearestDatumArgs<XScale, YScale, Datum>, groupScale: ScaleTypeToD3Scale<string, string>['band'], horizontal?: boolean): {
    distanceX: number;
    distanceY: number;
    datum: Datum;
    index: number;
} | null;
//# sourceMappingURL=findNearestGroupDatum.d.ts.map