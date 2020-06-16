import { useEffect, useContext } from 'react';
import ChartContext from '../context/ChartContext';
import { RegisterDataArgs } from '../types';

export default function useDataRegistry({
  data,
  key,
  xAccessor,
  yAccessor,
  mouseEvents,
  legendShape,
}: RegisterDataArgs) {
  const { registerData, unregisterData } = useContext(ChartContext);

  // register data on mount
  useEffect(() => {
    registerData({ key, data, xAccessor, yAccessor, mouseEvents, legendShape });
    return () => unregisterData(key);
  }, [registerData, unregisterData, key, data, xAccessor, yAccessor, mouseEvents, legendShape]);
}
