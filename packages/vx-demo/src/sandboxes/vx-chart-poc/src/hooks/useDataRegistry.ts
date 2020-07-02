import { useEffect, useContext } from 'react';
import ChartContext from '../context/ChartContext';
import { DataRegistry } from '../types';

export default function useDataRegistry({
  data,
  key,
  xAccessor,
  yAccessor,
  mouseEvents,
  legendShape,
  findNearestDatum,
}: DataRegistry[string]) {
  const { registerData, unregisterData } = useContext(ChartContext);

  // register data on mount
  useEffect(() => {
    registerData({
      [key]: { key, data, xAccessor, yAccessor, mouseEvents, legendShape, findNearestDatum },
    });
    return () => unregisterData(key);
  }, [
    registerData,
    unregisterData,
    key,
    data,
    xAccessor,
    yAccessor,
    mouseEvents,
    legendShape,
    findNearestDatum,
  ]);
}
