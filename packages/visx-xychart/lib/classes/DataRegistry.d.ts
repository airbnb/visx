import { AxisScale } from '@visx/axis';
import { DataRegistryEntry } from '../types/data';
/** A class for holding data entries */
export default class DataRegistry<XScale extends AxisScale, YScale extends AxisScale, Datum extends object> {
    private registry;
    private registryKeys;
    /** Add one or more entries to the registry. */
    registerData(entryOrEntries: DataRegistryEntry<XScale, YScale, Datum> | DataRegistryEntry<XScale, YScale, Datum>[]): void;
    /** Remove one or more entries to the registry. */
    unregisterData(keyOrKeys: string | string[]): void;
    /** Returns all data registry entries. This value is not constant between calls. */
    entries(): DataRegistryEntry<XScale, YScale, Datum>[];
    /** Returns a specific entity from the registry, if it exists. */
    get(key: string): DataRegistryEntry<XScale, YScale, Datum>;
    /**
     * Returns the current registry keys.
     * This value is constant between calls if the keys themselves have not changed.
     */
    keys(): string[];
}
//# sourceMappingURL=DataRegistry.d.ts.map