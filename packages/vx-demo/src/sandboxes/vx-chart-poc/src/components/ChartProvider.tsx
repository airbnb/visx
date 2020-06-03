import React from 'react';
import debounce from 'lodash/debounce';

import {
  ChartContext as ChartContextType,
  ChartTheme,
  ScaleConfig,
  RegisterData,
  Margin,
} from '../types';
import ChartContext from '../context/ChartContext';
import createScale from '../createScale';

export type ChartProviderProps = {
  theme?: ChartTheme;
  xScale: ScaleConfig;
  yScale: ScaleConfig;
  children: React.ReactNode;
  /** @TODO add tooltipData, tooltipCoords for initial placement */
};

type ChartProviderState = Pick<ChartContextType, 'xScale' | 'yScale' | 'theme' | 'dataRegistry'> & {
  width: number | null;
  height: number | null;
  margin: Margin;
};

const defaultMargin = { top: 30, right: 30, bottom: 30, left: 30 };

export default class ChartProvider extends React.Component<ChartProviderProps, ChartProviderState> {
  state: ChartProviderState = {
    theme: this.props?.theme ?? {},
    dataRegistry: {},
    margin: defaultMargin,
    xScale: null,
    yScale: null,
    width: null,
    height: null,
  };

  registerData: RegisterData = dataToRegister => {
    this.setState(
      ({ dataRegistry }) => ({
        dataRegistry: { ...dataRegistry, [dataToRegister.key]: dataToRegister },
      }),
      this.updateScales,
    );
  };

  unregisterData = (key: string) => {
    const { [key]: omit, ...dataRegistry } = this.state.dataRegistry;
    this.setState({ dataRegistry: { ...dataRegistry } });
  };

  // this will update context so we debounce it
  setChartDimensions: ChartContextType['setChartDimensions'] = debounce(
    ({ width, height, margin }) => {
      if (width > 0 && height > 0) {
        this.setState({ width, height, margin: margin ?? defaultMargin }, this.updateScales);
      }
    },
    100,
  );

  updateScales = debounce(() => {
    const { xScale: xScaleConfig, yScale: yScaleConfig } = this.props;
    const { margin, width, height, dataRegistry } = this.state;

    if (width != null && height != null) {
      console.info('updateScales', { width, height, margin, dataRegistry });

      const xScale = createScale({
        accessorKey: 'xAccessor',
        config: xScaleConfig,
        range: [margin.left, width - margin.left - margin.right],
        dataRegistry,
      });

      const yScale = createScale({
        accessorKey: 'yAccessor',
        config: yScaleConfig,
        range: [height - margin.top - margin.bottom, margin.top],
        dataRegistry,
      });

      this.setState({ xScale, yScale });
    }
  }, 100);

  /** @TODO add setTooltipData, setTooltipCoords */

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
