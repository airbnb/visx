import { AxisScaleOutput } from '@vx/axis';
import { ScaleConfig, NumberLike, createScale, ScaleInput } from '@vx/scale';
import { extent as d3Extent } from 'd3-array';
import { useMemo } from 'react';
import DataRegistry from '../classes/DataRegistry';

/** A hook for creating memoized x- and y-scales. */
export default function useScales<
  XScaleConfig extends ScaleConfig<AxisScaleOutput>,
  YScaleConfig extends ScaleConfig<AxisScaleOutput>,
  Datum = unknown
>({
  xScaleConfig,
  yScaleConfig,
  dataRegistry,
  xRange,
  yRange,
}: {
  xScaleConfig: XScaleConfig;
  yScaleConfig: YScaleConfig;
  dataRegistry: DataRegistry<XScaleConfig, YScaleConfig, Datum>;
  xRange: [number, number];
  yRange: [number, number];
}) {
  // pull out memoization keys that are less likely to change
  const registryKeys = dataRegistry.keys();
  const [xMin, xMax] = xRange;
  const [yMin, yMax] = yRange;

  return useMemo(() => {
    const registryEntries = registryKeys.map(key => dataRegistry.get(key));

    // create scale, and then infer its type
    let xScale = createScale(xScaleConfig);
    type XScale = typeof xScale;
    type XScaleInput = ScaleInput<XScale>;

    const xValues = registryEntries.reduce<XScaleInput[]>(
      (combined, entry) =>
        entry ? combined.concat(entry.data.map((d: Datum) => entry.xAccessor(d))) : combined,
      [],
    );

    const xType = xScaleConfig.type;
    const xDomain =
      xType === 'band' || xType === 'ordinal'
        ? xValues
        : (d3Extent(xValues as NumberLike[]) as XScaleInput[]);

    xScale.range(xScaleConfig.range || [xMin, xMax]);
    xScale.domain(xScaleConfig.domain || xDomain);

    // same for yScale. this logic is hard to apply generically because of the scale types / accessors
    let yScale = createScale(yScaleConfig);
    type YScale = typeof yScale;
    type YScaleInput = ScaleInput<YScale>;

    const yValues = registryEntries.reduce<YScaleInput[]>(
      (combined, entry) =>
        entry ? combined.concat(entry.data.map((d: Datum) => entry.yAccessor(d))) : combined,
      [],
    );

    const yType = yScaleConfig.type;
    const yDomain =
      yType === 'band' || yType === 'ordinal'
        ? yValues
        : (d3Extent(yValues as NumberLike[]) as XScaleInput[]);

    yScale.range(yScaleConfig.range || [yMin, yMax]);
    yScale.domain(yScaleConfig.domain || yDomain);

    // apply any scale updates from the registy
    registryEntries.forEach(entry => {
      if (entry?.xScale) xScale = entry.xScale(xScale);
      if (entry?.yScale) yScale = entry.yScale(yScale);
    });

    return { xScale, yScale };
  }, [dataRegistry, xScaleConfig, yScaleConfig, registryKeys, xMin, xMax, yMin, yMax]);
}
