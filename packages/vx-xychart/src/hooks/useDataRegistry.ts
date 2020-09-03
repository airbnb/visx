import { AxisScaleOutput } from '@vx/axis';
import { useMemo } from 'react';
import { ScaleConfig } from '@vx/scale';
import DataRegistry from '../classes/DataRegistry';

/** Hook that returns a constant instance of a DataRegistry.  */
export default function useDataRegistry<
  XScaleConfig extends ScaleConfig<AxisScaleOutput>,
  YScaleConfig extends ScaleConfig<AxisScaleOutput>,
  Datum = unknown
>() {
  return useMemo(() => new DataRegistry<XScaleConfig, YScaleConfig, Datum>(), []);
}
