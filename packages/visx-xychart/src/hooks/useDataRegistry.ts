import { AxisScale } from '@visx/axis';
import { useMemo } from 'react';
import DataRegistry from '../classes/DataRegistry';

/** Hook that returns a constant instance of a DataRegistry.  */
export default function useDataRegistry<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum = unknown
>() {
  return useMemo(() => new DataRegistry<XScale, YScale, Datum>(), []);
}
