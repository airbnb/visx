import { useMemo } from 'react';
import { AxisScale, AxisScaleOutput } from '@vx/axis';
import { createScale, ScaleConfig, updateScale } from '@vx/scale';
import { DataRegistry } from './useDataRegistry';

export default function useScale<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum,
  DataKey extends string = string
>({
  dataRegistry,
  scaleConfig,
  min,
  max,
}: {
  dataRegistry: DataRegistry<XScale, YScale, Datum, DataKey>;
  scaleConfig: ScaleConfig<AxisScaleOutput>;
  min: number;
  max: number;
}) {
  const registryId = dataRegistry.id();
  return useMemo(() => {
    if (!registryId) return createScale(scaleConfig);

    const registryEntries = dataRegistry.entries();
    const xValues = registryEntries.reduce(
      (combined, entry) => combined.concat(entry.data.map(entry.xAccessor)),
      [],
    );
    const { type, ...restScaleConfig } = scaleConfig;
    const domain = type === 'band' || type === 'ordinal' ? xValues : d3Extent(xValues);
    let scale = createScale({ type, domain, range: [min, max] });

    // apply any scale updates from the registy
    registryEntries.forEach(entry => {
      if (entry.xScale) scale = entry.xScale(scale);
    });

    return updateScale(scale, restScaleConfig);
  }, [registryId, scaleConfig, min, max, dataRegistry]);
}
