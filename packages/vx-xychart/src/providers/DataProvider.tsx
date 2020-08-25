// can provide theme if passed as prop or not available in context?
// similarly SVGChart can serve as data provider if not available in context?
import { ScaleConfig, createScale, PickD3Scale, updateScale } from '@vx/scale';
import { extent as d3Extent } from 'd3-array';
import React, { useContext, useState, useMemo } from 'react';
import createOrdinalScale from '@vx/scale/lib/scales/ordinal';
import { AxisScaleOutput } from '@vx/axis';
import { XYChartTheme } from '../types';
import ThemeContext from '../context/ThemeContext';
import DataContext from '../context/DataContext';
import useDataRegistry from '../hooks/useDataRegistry';
import useScale from '../hooks/useScale';

const INITIAL_DIMENSIONS = {
  width: 0,
  height: 0,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
};

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
  type XScale = PickD3Scale<XScaleConfig['type'], AxisScaleOutput>;
  type YScale = PickD3Scale<YScaleConfig['type'], AxisScaleOutput>;

  const contextTheme = useContext(ThemeContext);
  const theme = propsTheme || contextTheme;

  const [{ width, height, margin }, setDimensions] = useState(INITIAL_DIMENSIONS);
  const innerWidth = width - (margin?.left ?? 0) - (margin?.right ?? 0);
  const innerHeight = height - margin?.top ?? 0 - margin?.bottom ?? 0;

  const { dataRegistry, registerData, unregisterData } = useDataRegistry<
    XScale,
    YScale,
    Datum,
    DataKey
  >();

  const xScale = useScale<XScale, YScale, Datum, DataKey>({
    dataRegistry,
    scaleConfig: xScaleConfig,
    min: margin.left,
    max: width - margin.right,
  });

  const yScale = useScale<XScale, YScale, Datum, DataKey>({
    dataRegistry,
    scaleConfig: yScaleConfig,
    min: margin.top,
    max: height - margin.bottom,
  });

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
      value={{
        dataRegistry,
        registerData,
        unregisterData,
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
