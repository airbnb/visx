import { AxisScaleOutput } from '@vx/axis';
import { ScaleConfig } from '@vx/scale';
import { DataRegistryEntry } from '../types/data';

/** A class for holding data entries */
export default class DataRegistry<
  XScaleConfig extends ScaleConfig<AxisScaleOutput>,
  YScaleConfig extends ScaleConfig<AxisScaleOutput>,
  Datum = unknown,
  DataKey extends string = string
> {
  private registry = new Map<
    string,
    DataRegistryEntry<XScaleConfig, YScaleConfig, Datum, DataKey>
  >();

  public keys: DataKey[] = [];

  /** Add one or more entries to the registry. */
  public registerData(
    entryOrEntries:
      | DataRegistryEntry<XScaleConfig, YScaleConfig, Datum, DataKey>
      | DataRegistryEntry<XScaleConfig, YScaleConfig, Datum, DataKey>[],
  ) {
    const entries = Array.isArray(entryOrEntries) ? entryOrEntries : [entryOrEntries];
    entries.forEach(currEntry => {
      if (this.registry.has(currEntry.key)) {
        console.debug('Overriding data registry key', currEntry.key);
      }
      this.registry.set(currEntry.key, currEntry);
      this.keys = this.keys.filter(key => key !== currEntry.key);
      this.keys.push(currEntry.key);
    });
  }

  /** Remove one or more entries to the registry. */
  public unregisterData(keyOrKeys: string | string[]) {
    const keys = Array.isArray(keyOrKeys) ? keyOrKeys : [keyOrKeys];
    keys.forEach(currKey => {
      this.registry.delete(currKey);
      this.keys = this.keys.filter(key => key !== currKey);
    });
  }

  /** Returns the data registry entry for the specified key, or all entries if no key is specified. */
  public entries() {
    return [...this.registry.values()];
  }

  /** Returns a specific entity from the registry, if it exists. */
  public get(key: string) {
    return this.registry.get(key);
  }
}
