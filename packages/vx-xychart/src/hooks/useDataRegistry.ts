import { AxisScale } from '@vx/axis';
import { useMemo } from 'react';
import { DataRegistryEntry } from '../types/data';

/** A class for holding data entries */
export class DataRegistry<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum = unknown,
  DataKey extends string = string
> {
  private registry = new Map<string, DataRegistryEntry<XScale, YScale, Datum, DataKey>>();

  private registryId = 0;

  public keys: DataKey[] = [];

  /** Add one or more entries to the registry. */
  public registerData(
    entryOrEntries:
      | DataRegistryEntry<XScale, YScale, Datum, DataKey>
      | DataRegistryEntry<XScale, YScale, Datum, DataKey>[],
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
    this.registryId += 1;
  }

  /** Remove one or more entries to the registry. */
  public unregisterData(keyOrKeys: string | string[]) {
    const keys = Array.isArray(keyOrKeys) ? keyOrKeys : [keyOrKeys];
    keys.forEach(currKey => {
      this.registry.delete(currKey);
      this.keys = this.keys.filter(key => key !== currKey);
    });
    this.registryId += 1;
  }

  /** Returns the data registry entry for the specified key, or all entries if no key is specified. */
  public entries() {
    return [...this.registry.values()];
  }

  public id() {
    return `${this.registryId}`;
  }
}

export default function useDataRegistry<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum = unknown,
  DataKey extends string = string
>() {
  return useMemo(() => {
    const dataRegistry = new DataRegistry<XScale, YScale, Datum, DataKey>();
    return {
      dataRegistry,
      registerData: dataRegistry.registerData,
      unregisterData: dataRegistry.unregisterData,
    };
  }, []);
}
