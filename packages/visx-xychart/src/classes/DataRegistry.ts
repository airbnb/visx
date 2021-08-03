import { AxisScale } from '@visx/axis';
import { DataRegistryEntry } from '../types/data';

/** A class for holding data entries */
export default class DataRegistry<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
> {
  private registry: { [key: string]: DataRegistryEntry<XScale, YScale, Datum> } = {};

  private registryKeys: string[] = [];

  /** Add one or more entries to the registry. */
  public registerData(
    entryOrEntries:
      | DataRegistryEntry<XScale, YScale, Datum>
      | DataRegistryEntry<XScale, YScale, Datum>[],
  ) {
    const entries = Array.isArray(entryOrEntries) ? entryOrEntries : [entryOrEntries];
    entries.forEach((currEntry) => {
      if (currEntry.key in this.registry && this.registry[currEntry.key] != null) {
        console.debug('Overriding data registry key', currEntry.key);
      }
      this.registry[currEntry.key] = currEntry;
      this.registryKeys = Object.keys(this.registry);
    });
  }

  /** Remove one or more entries to the registry. */
  public unregisterData(keyOrKeys: string | string[]) {
    const keys = Array.isArray(keyOrKeys) ? keyOrKeys : [keyOrKeys];
    keys.forEach((currKey) => {
      delete this.registry[currKey];
      this.registryKeys = Object.keys(this.registry);
    });
  }

  /** Returns all data registry entries. This value is not constant between calls. */
  public entries() {
    return Object.values(this.registry);
  }

  /** Returns a specific entity from the registry, if it exists. */
  public get(key: string) {
    return this.registry[key];
  }

  /**
   * Returns the current registry keys.
   * This value is constant between calls if the keys themselves have not changed.
   */
  public keys() {
    return this.registryKeys;
  }
}
