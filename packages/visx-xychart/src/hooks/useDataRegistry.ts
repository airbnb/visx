import { AxisScale } from '@visx/axis';
import { useMemo, useState } from 'react';
import DataRegistry from '../classes/DataRegistry';

/** Hook that returns an API equivalent to DataRegistry but which updates as needed for use as a hook. */
export default function useDataRegistry<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object
>() {
  const [, forceUpdate] = useState(Math.random());
  const privateRegistry = useMemo(() => new DataRegistry<XScale, YScale, Datum>(), []);

  return useMemo(
    () => ({
      registerData: (...params: Parameters<typeof DataRegistry.prototype.registerData>) => {
        privateRegistry.registerData(...params);
        forceUpdate(Math.random());
      },
      unregisterData: (...params: Parameters<typeof DataRegistry.prototype.unregisterData>) => {
        privateRegistry.unregisterData(...params);
        forceUpdate(Math.random());
      },
      entries: () => privateRegistry.entries(),
      get: (key: string) => privateRegistry.get(key),
      keys: () => privateRegistry.keys(),
    }),
    [privateRegistry],
  );
}
