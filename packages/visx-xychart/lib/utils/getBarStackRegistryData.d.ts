import { AxisScale } from '@visx/axis';
import { BarStackData, BarStackDatum, DataRegistryEntry } from '../types';
/** Constructs the `DataRegistryEntry`s for a BarStack, using the stacked data. */
export default function getBarStackRegistryData<XScale extends AxisScale, YScale extends AxisScale>(stackedData: BarStackData<XScale, YScale>, comprehensiveDomain: [number, number], horizontal?: boolean): DataRegistryEntry<XScale, YScale, BarStackDatum<XScale, YScale>>[];
//# sourceMappingURL=getBarStackRegistryData.d.ts.map