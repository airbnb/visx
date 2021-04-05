import { AxisScale } from '@visx/axis';
import { ScaleInput } from '@visx/scale';
/** Finds the nearest datum in a single direction (x or y) closest to the specified `scaledValue`. */
export default function findNearestDatumSingleDimension<Scale extends AxisScale, Datum extends object>({ scale, accessor, scaledValue, data, }: {
    scale: Scale;
    accessor: (d: Datum) => ScaleInput<Scale>;
    scaledValue: number;
    data: Datum[];
}): {
    datum: Datum;
    index: number;
    distance: number;
} | null;
//# sourceMappingURL=findNearestDatumSingleDimension.d.ts.map