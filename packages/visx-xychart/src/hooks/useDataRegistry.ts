import { AxisScale } from '@visx/axis';
import { useCallback, useMemo, useState } from 'react';
import DataRegistry from '../classes/DataRegistry';

/** Hook that returns a constant instance of a DataRegistry.  */
export default function useDataRegistry<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object
>() {
  const [, forceUpdate] = useState(Math.random());
  const privateRegistry = useMemo(() => new DataRegistry<XScale, YScale, Datum>(), []);

  const registerData = useCallback(
    (...params: Parameters<typeof DataRegistry.prototype.registerData>) => {
      privateRegistry.registerData(...params);
      forceUpdate(Math.random());
    },
    [privateRegistry],
  );
  const unregisterData = useCallback(
    (...params: Parameters<typeof DataRegistry.prototype.unregisterData>) => {
      privateRegistry.unregisterData(...params);
      forceUpdate(Math.random());
    },
    [privateRegistry],
  );
  const entries = useCallback(() => privateRegistry.entries(), [privateRegistry]);
  const get = useCallback((key: string) => privateRegistry.get(key), [privateRegistry]);
  const keys = useCallback(() => privateRegistry.keys(), [privateRegistry]);

  return useMemo(
    () => ({
      registerData,
      unregisterData,
      entries,
      get,
      keys,
    }),
    [registerData, unregisterData, entries, get, keys],
  );
}
