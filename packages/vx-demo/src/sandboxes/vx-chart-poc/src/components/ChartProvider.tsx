import React from 'react';
import debounce from 'lodash/debounce';
import defaultTheme from '../theme/default';

import {
  ChartContext as ChartContextType,
  ChartTheme,
  ScaleConfig,
  RegisterData,
  Margin,
  DatumWithKey,
} from '../types';
import ChartContext from '../context/ChartContext';
import createScale from '../createScale';

export type ChartProviderProps<XDatum, YDatum> = {
  theme?: ChartTheme;
  xScale: ScaleConfig<XDatum>;
  yScale: ScaleConfig<YDatum>;
  children: React.ReactNode;
};

type ChartProviderState = Pick<ChartContextType, 'xScale' | 'yScale' | 'theme' | 'dataRegistry'> & {
  width: number | null;
  height: number | null;
  margin: Margin;
  combinedData: DatumWithKey[];
};

const defaultMargin = { top: 30, right: 30, bottom: 30, left: 30 };

export default class ChartProvider<XDatum = unknown, YDatum = unknown> extends React.Component<
  ChartProviderProps<XDatum, YDatum>,
  ChartProviderState
> {
  state: ChartProviderState = {
    theme: this.props?.theme ?? defaultTheme,
    dataRegistry: {},
    margin: defaultMargin,
    xScale: null,
    yScale: null,
    width: null,
    height: null,
    combinedData: [],
  };

  /** Adds data to the registry and to combined data if it supports events. */
  registerData: RegisterData = dataToRegister => {
    this.setState(
      ({ dataRegistry, combinedData }) => ({
        dataRegistry: {
          ...dataRegistry,
          [dataToRegister.key]: { mouseEvents: true, ...dataToRegister },
        },
        combinedData: [
          ...combinedData,
          ...dataToRegister.data.map((datum, index) => ({
            key: dataToRegister.key,
            datum,
            index,
          })),
        ],
      }),
      this.updateScales,
    );
  };

  /** Removes data from the registry and combined data. */
  unregisterData = (key: string) => {
    this.setState(({ dataRegistry, combinedData }) => {
      const { [key]: omit, ...rest } = dataRegistry;
      return { dataRegistry: { ...rest }, combinedData: combinedData.filter(d => d.key !== key) };
    }, this.updateScales);
  };

  /** Sets chart dimensions. */
  setChartDimensions: ChartContextType['setChartDimensions'] = debounce(
    ({ width, height, margin }) => {
      if (width > 0 && height > 0) {
        this.setState({ width, height, margin: margin ?? defaultMargin }, this.updateScales);
      }
    },
    50,
  );

  updateScales = debounce(() => {
    const { xScale: xScaleConfig, yScale: yScaleConfig } = this.props;
    const { margin, width, height, dataRegistry, combinedData } = this.state;
    console.log({ margin, width, height, dataRegistry, combinedData });

    if (width != null && height != null) {
      const xScale = createScale<XDatum>({
        data: combinedData.map(({ key, datum }) => dataRegistry[key]?.xAccessor(datum)) as XDatum[],
        scaleConfig: xScaleConfig,
        range: [margin.left, width - margin.left - margin.right],
      });

      const yScale = createScale<YDatum>({
        data: combinedData.map(({ key, datum }) => dataRegistry[key]?.yAccessor(datum)) as YDatum[],
        scaleConfig: yScaleConfig,
        range: [height - margin.top - margin.bottom, margin.top],
      });

      this.setState({ xScale, yScale });
    }
  }, 100);

  render() {
    const { width, height, xScale, yScale, theme, dataRegistry } = this.state;
    return (
      <ChartContext.Provider
        value={{
          xScale,
          yScale,
          width,
          height,
          theme,
          dataRegistry,
          registerData: this.registerData,
          unregisterData: this.unregisterData,
          setChartDimensions: this.setChartDimensions,
        }}
      >
        {this.props.children}
      </ChartContext.Provider>
    );
  }
}
