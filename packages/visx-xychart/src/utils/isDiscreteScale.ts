/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxisScaleOutput } from '@visx/axis';
import { ScaleConfig } from '@visx/scale';

export default function isDiscreteScale(scaleConfig: ScaleConfig<AxisScaleOutput, any, any>) {
  return (
    scaleConfig?.type === 'band' || scaleConfig?.type === 'ordinal' || scaleConfig?.type === 'point'
  );
}
