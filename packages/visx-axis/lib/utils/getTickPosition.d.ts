import { ScaleInput } from '@visx/scale';
import { AxisScale, AxisScaleOutput } from '../types';
/**
 * Create a function that returns a tick position for the given tick value
 */
export default function getTickPosition<Scale extends AxisScale>(scale: Scale, align?: 'start' | 'center' | 'end'): (d: ScaleInput<Scale>) => AxisScaleOutput;
//# sourceMappingURL=getTickPosition.d.ts.map