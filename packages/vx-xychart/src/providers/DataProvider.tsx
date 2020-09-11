import { ScaleConfig, ScaleConfigToD3Scale } from '@vx/scale';
import React, { useContext, useMemo } from 'react';
import createOrdinalScale from '@vx/scale/lib/scales/ordinal';
import { AxisScaleOutput } from '@vx/axis';
import { XYChartTheme } from '../types';
import ThemeContext from '../context/ThemeContext';
import DataContext from '../context/DataContext';
import useDataRegistry from '../hooks/useDataRegistry';
import useDimensions from '../hooks/useDimensions';
import useScales from '../hooks/useScales';

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
  Datum = unknown
>({
  theme: propsTheme,
  xScale: xScaleConfig,
  yScale: yScaleConfig,
  children,
}: DataProviderProps<XScaleConfig, YScaleConfig>) {
  // `DataProvider` provides a theme so that `ThemeProvider` is not strictly needed.
  // `props.theme` takes precedent over `context.theme`, which has a default even if
  // a ThemeProvider is not present.
  const contextTheme = useContext(ThemeContext);
  const theme = propsTheme || contextTheme;

  const [{ width, height, margin }, setDimensions] = useDimensions();
  const innerWidth = width - (margin?.left ?? 0) - (margin?.right ?? 0);
  const innerHeight = height - margin?.top ?? 0 - margin?.bottom ?? 0;

  type XScale = ScaleConfigToD3Scale<XScaleConfig, AxisScaleOutput>;
  type YScale = ScaleConfigToD3Scale<YScaleConfig, AxisScaleOutput>;

  const dataRegistry = useDataRegistry<XScale, YScale, Datum>();

  const scales: { xScale: XScale; yScale: YScale } = useScales({
    dataRegistry,
    xScaleConfig,
    yScaleConfig,
    xRange: [margin.left, width - margin.right],
    yRange: [margin.top, height - margin.bottom],
  });

  const registryKeys = dataRegistry.keys();

  const colorScale = useMemo(
    () =>
      createOrdinalScale({
        domain: registryKeys,
        range: theme.colors,
      }),
    [registryKeys, theme.colors],
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
