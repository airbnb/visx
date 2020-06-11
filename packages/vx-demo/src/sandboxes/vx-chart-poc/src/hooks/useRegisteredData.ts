import { useContext } from 'react';
import ChartContext from '../context/ChartContext';
import { DataRegistry } from '../types';

export default function useRegisteredData<
  Datum = unknown,
  XScaleInput = unknown,
  YScaleInput = unknown
>(dataKey: string): DataRegistry<Datum, XScaleInput, YScaleInput>[string] | null {
  const { dataRegistry } = useContext(ChartContext);

  return dataRegistry[dataKey] || null;
}
