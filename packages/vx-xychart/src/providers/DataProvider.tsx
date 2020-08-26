import { ScaleConfig, createScale, updateScale, ScaleConfigToD3Scale, ScaleInput } from '@vx/scale';
import { extent as d3Extent } from 'd3-array';
import React, { useContext, useMemo } from 'react';
import createOrdinalScale from '@vx/scale/lib/scales/ordinal';
import { AxisScaleOutput } from '@vx/axis';
import { XYChartTheme } from '../types';
import ThemeContext from '../context/ThemeContext';
import DataContext from '../context/DataContext';
import useDataRegistry from '../hooks/useDataRegistry';
import useDimensions from '../hooks/useDimensions';

/** Props that can be passed to initialize/update the provider config. */
export type DataProviderProps<
  XScaleConfig extends ScaleConfig<AxisScaleOutput>,
  YScaleConfig extends ScaleConfig<AxisScaleOutput>
> = {
  theme?: XYChartTheme;
  xScale: XScaleConfig;
  yScale: YScaleConfig;
  children: React.ReactNode;
};

export default function DataProvider<
  XScaleConfig extends ScaleConfig<AxisScaleOutput>,
  YScaleConfig extends ScaleConfig<AxisScaleOutput>,
  Datum = unknown,
  DataKey extends string = string
>({
  theme: propsTheme,
  xScale: xScaleConfig,
  yScale: yScaleConfig,
  children,
}: DataProviderProps<XScaleConfig, YScaleConfig>) {
  type XScale = ScaleConfigToD3Scale<XScaleConfig, AxisScaleOutput>;
  type YScale = ScaleConfigToD3Scale<YScaleConfig, AxisScaleOutput>;
  type XScaleInput = ScaleInput<ScaleConfigToD3Scale<XScaleConfig, AxisScaleOutput>>;
  type YScaleInput = ScaleInput<ScaleConfigToD3Scale<YScaleConfig, AxisScaleOutput>>;

  const contextTheme = useContext(ThemeContext);
  const theme = propsTheme || contextTheme;
  const [{ width, height, margin }, setDimensions] = useDimensions();
  const innerWidth = width - (margin?.left ?? 0) - (margin?.right ?? 0);
  const innerHeight = height - margin?.top ?? 0 - margin?.bottom ?? 0;

  const dataRegistry = useDataRegistry<XScaleConfig, YScaleConfig, Datum, DataKey>();

  // keys are the memoization value that matters for this memo
  const registryKeys = dataRegistry.keys;

  // @TODO(chris) factor out to a separate hook
  const scales = useMemo(() => {
    const registryEntries = registryKeys.map(key => dataRegistry.get(key));

    const xValues = registryEntries.reduce<XScaleInput[]>(
      (combined, entry) =>
        entry ? combined.concat(entry.data.map((d: Datum) => entry.xAccessor(d))) : combined,
      [],
    );
    const yValues = registryEntries.reduce<YScaleInput[]>(
      (combined, entry) =>
        entry ? combined.concat(entry.data.map((d: Datum) => entry.yAccessor(d))) : combined,
      [],
    );

    const xMin = margin.left;
    const xMax = width - margin.right;
    const yMin = margin.top;
    const yMax = height - margin.bottom;

    const { type: xType, ...restXScaleConfig } = xScaleConfig;
    const { type: yType, ...restYScaleConfig } = yScaleConfig;

    let xScale = createScale({
      type: xType,
      ...restXScaleConfig,
      range: [xMin, xMax],
      domain:
        xType === 'ordinal' || xType === 'band'
          ? xValues
          : (d3Extent(xValues, v => v) as XScaleInput[]),
    }) as XScale;

    let yScale = createScale({
      type: yType,
      ...restXScaleConfig,
      range: [yMin, yMax],
      domain:
        yType === 'ordinal' || yType === 'band'
          ? yValues
          : (d3Extent(yValues, v => v) as YScaleInput[]),
    }) as YScale;

    // apply any scale updates from the registy
    registryEntries.forEach(entry => {
      if (entry?.xScale) xScale = entry.xScale(xScale);
      if (entry?.yScale) yScale = entry.yScale(yScale);
    });

    xScale = updateScale<AxisScaleOutput, XScaleInput>(xScale, restXScaleConfig) as XScale;
    yScale = updateScale<AxisScaleOutput, YScaleInput>(yScale, restYScaleConfig) as YScale;

    return { xScale, yScale };
  }, [dataRegistry, xScaleConfig, yScaleConfig, registryKeys, width, height, margin]);

  const colorScale = useMemo(
    () =>
      createOrdinalScale<DataKey, string>({
        domain: dataRegistry.keys,
        range: theme.colors,
      }),
    [dataRegistry.keys, theme.colors],
  );

  return (
    <DataContext.Provider
      // everthing returned here should be memoized between renders
      value={{
        dataRegistry,
        registerData: dataRegistry.registerData,
        unregisterData: dataRegistry.unregisterData,
        xScale: scales.xScale,
        yScale: scales.yScale,
        colorScale,
        theme,
        width,
        height,
        margin,
        innerWidth,
        innerHeight,
        setDimensions,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
