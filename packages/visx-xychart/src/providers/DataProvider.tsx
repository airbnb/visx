/* eslint-disable @typescript-eslint/no-explicit-any */
import { ScaleConfig, ScaleConfigToD3Scale } from '@visx/scale';
import React, { useContext, useMemo } from 'react';
import createOrdinalScale from '@visx/scale/lib/scales/ordinal';
import { AxisScaleOutput } from '@visx/axis';
import { XYChartTheme } from '../types';
import ThemeContext from '../context/ThemeContext';
import DataContext from '../context/DataContext';
import useDataRegistry from '../hooks/useDataRegistry';
import useDimensions, { Dimensions } from '../hooks/useDimensions';
import useScales from '../hooks/useScales';

/** Props that can be passed to initialize/update the provider config. */
export type DataProviderProps<
  XScaleConfig extends ScaleConfig<AxisScaleOutput, any, any>,
  YScaleConfig extends ScaleConfig<AxisScaleOutput, any, any>
> = {
  initialDimensions?: Partial<Dimensions>;
  theme?: XYChartTheme;
  xScale: XScaleConfig;
  yScale: YScaleConfig;
  children: React.ReactNode;
};

export default function DataProvider<
  XScaleConfig extends ScaleConfig<AxisScaleOutput>,
  YScaleConfig extends ScaleConfig<AxisScaleOutput>,
  Datum extends object
>({
  initialDimensions,
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
  const [{ width, height, margin }, setDimensions] = useDimensions(initialDimensions);
  const innerWidth = width - (margin?.left ?? 0) - (margin?.right ?? 0);
  const innerHeight = height - (margin?.top ?? 0) - (margin?.bottom ?? 0);

  type XScale = ScaleConfigToD3Scale<XScaleConfig, AxisScaleOutput, any, any>;
  type YScale = ScaleConfigToD3Scale<YScaleConfig, AxisScaleOutput, any, any>;

  const dataRegistry = useDataRegistry<XScale, YScale, Datum>();

  const { xScale, yScale }: { xScale: XScale; yScale: YScale } = useScales({
    dataRegistry,
    xScaleConfig,
    yScaleConfig,
    xRange: [margin.left, width - margin.right],
    yRange: [height - margin.bottom, margin.top],
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
        xScale,
        yScale,
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
