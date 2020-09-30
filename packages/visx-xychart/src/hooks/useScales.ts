import { AxisScaleOutput, AxisScale } from '@visx/axis';
import { ScaleConfig, createScale, ScaleInput } from '@visx/scale';
import { extent as d3Extent } from 'd3-array';
import { useMemo } from 'react';
import DataRegistry from '../classes/DataRegistry';

/** A hook for creating memoized x- and y-scales. */
export default function useScales<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object
>({
  xScaleConfig,
  yScaleConfig,
  dataRegistry,
  xRange,
  yRange,
}: {
  xScaleConfig: ScaleConfig<AxisScaleOutput>;
  yScaleConfig: ScaleConfig<AxisScaleOutput>;
  dataRegistry: Omit<DataRegistry<XScale, YScale, Datum>, 'registry' | 'registryKeys'>;
  xRange: [number, number];
  yRange: [number, number];
}) {
  // pull out memoization keys that are less likely to change
  const registryKeys = dataRegistry.keys();
  const [xMin, xMax] = xRange;
  const [yMin, yMax] = yRange;

  const memoizedXScale = useMemo(() => {
    const registryEntries = registryKeys.map(key => dataRegistry.get(key));

    let xScale = createScale(xScaleConfig) as XScale;
    type XScaleInput = ScaleInput<XScale>;

    const xValues = registryEntries.reduce<XScaleInput[]>(
      (combined, entry) =>
        entry ? combined.concat(entry.data.map((d: Datum) => entry.xAccessor(d))) : combined,
      [],
    );

    const xType = xScaleConfig.type;
    const xDomain = xType === 'band' || xType === 'ordinal' ? xValues : d3Extent(xValues);

    xScale.range(xScaleConfig.range || [xMin, xMax]);
    xScale.domain(xScaleConfig.domain || xDomain);

    // apply any scale updates from the registy
    registryEntries.forEach(entry => {
      if (entry?.xScale) xScale = entry.xScale(xScale);
    });

    return xScale;
  }, [dataRegistry, xScaleConfig, registryKeys, xMin, xMax]);

  // same for yScale. this logic is hard to apply generically because of the scale types / accessors
  const memoizedYScale = useMemo(() => {
    const registryEntries = registryKeys.map(key => dataRegistry.get(key));

    let yScale = createScale(yScaleConfig) as YScale;
    type YScaleInput = ScaleInput<YScale>;

    const yValues = registryEntries.reduce<YScaleInput[]>(
      (combined, entry) =>
        entry ? combined.concat(entry.data.map((d: Datum) => entry.yAccessor(d))) : combined,
      [],
    );

    const yType = yScaleConfig.type;
    const yDomain = yType === 'band' || yType === 'ordinal' ? yValues : d3Extent(yValues);

    yScale.range(yScaleConfig.range || [yMin, yMax]);
    yScale.domain(yScaleConfig.domain || yDomain);

    // apply any scale updates from the registy
    registryEntries.forEach(entry => {
      if (entry?.yScale) yScale = entry.yScale(yScale);
    });

    return yScale;
  }, [dataRegistry, yScaleConfig, registryKeys, yMin, yMax]);

  return { xScale: memoizedXScale, yScale: memoizedYScale };
}
