import { AxisScale } from '@visx/axis';
import { ScaleInput } from '@visx/scale';
/** Returns a function that takes a Datum as input and returns a scaled value, correcting for the scale's bandwidth if applicable. */
export default function getScaledValueFactory<Scale extends AxisScale, Datum>(scale: Scale, accessor: (d: Datum) => ScaleInput<Scale>, align?: 'start' | 'center' | 'end'): (d: Datum) => number;
//# sourceMappingURL=getScaledValueFactory.d.ts.map