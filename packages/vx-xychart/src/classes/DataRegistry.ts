import { AxisScaleOutput } from '@vx/axis';
import { ScaleConfig } from '@vx/scale';
import { DataRegistryEntry } from '../types/data';

/** A class for holding data entries */
export default class DataRegistry<
  XScaleConfig extends ScaleConfig<AxisScaleOutput>,
  YScaleConfig extends ScaleConfig<AxisScaleOutput>,
  Datum = unknown
> {
  private registry: { [key: string]: DataRegistryEntry<XScaleConfig, YScaleConfig, Datum> } = {};

  private registryKeys: string[] = [];

  /** Add one or more entries to the registry. */
  public registerData(
    entryOrEntries:
      | DataRegistryEntry<XScaleConfig, YScaleConfig, Datum>
      | DataRegistryEntry<XScaleConfig, YScaleConfig, Datum>[],
  ) {
    const entries = Array.isArray(entryOrEntries) ? entryOrEntries : [entryOrEntries];
    entries.forEach(currEntry => {
      if (currEntry.key in this.registry && this.registry[currEntry.key] != null) {
        console.debug('Overriding data registry key', currEntry.key);
        this.registryKeys = this.registryKeys.filter(key => key !== currEntry.key);
      }
      this.registry[currEntry.key] = currEntry;
      this.registryKeys.push(currEntry.key);
    });
  }

  /** Remove one or more entries to the registry. */
  public unregisterData(keyOrKeys: string | string[]) {
    const keys = Array.isArray(keyOrKeys) ? keyOrKeys : [keyOrKeys];
    keys.forEach(currKey => {
      delete this.registry[currKey];
      this.registryKeys = this.registryKeys.filter(key => key !== currKey);
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

  /** Returns the current registry keys. This value is constant between calls if the keys themselves have not changed. */
  public keys() {
    return this.registryKeys;
  }
}
