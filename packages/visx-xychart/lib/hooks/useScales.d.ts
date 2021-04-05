import { AxisScaleOutput, AxisScale } from '@visx/axis';
import { ScaleConfig } from '@visx/scale';
import DataRegistry from '../classes/DataRegistry';
/** A hook for creating memoized x- and y-scales. */
export default function useScales<XScale extends AxisScale, YScale extends AxisScale, Datum extends object>({ dataRegistry, xRange, xScaleConfig, yRange, yScaleConfig, }: {
    xScaleConfig: ScaleConfig<AxisScaleOutput>;
    yScaleConfig: ScaleConfig<AxisScaleOutput>;
    dataRegistry: Omit<DataRegistry<XScale, YScale, Datum>, 'registry' | 'registryKeys'>;
    xRange: [number, number];
    yRange: [number, number];
}): {
    xScale: XScale | undefined;
    yScale: YScale | undefined;
};
//# sourceMappingURL=useScales.d.ts.map