import { TickFormatter, AxisScale } from '../types';
/**
 * Returns a tick position for the given tick value
 */
export default function getTickFormatter<Scale extends AxisScale>(scale: Scale): TickFormatter<Parameters<Scale>[0]>;
//# sourceMappingURL=getTickFormatter.d.ts.map