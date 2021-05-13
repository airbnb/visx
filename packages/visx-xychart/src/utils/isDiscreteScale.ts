/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxisScaleOutput } from "@seygai/visx-axis";
import { ScaleConfig } from "@seygai/visx-scale";

export default function isDiscreteScale(
  scaleConfig: ScaleConfig<AxisScaleOutput, any, any>
) {
  return (
    scaleConfig?.type === "band" ||
    scaleConfig?.type === "ordinal" ||
    scaleConfig?.type === "point"
  );
}
