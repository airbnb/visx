import React from 'react';
import debounce from 'lodash/debounce';
import { bisector, bisectLeft } from 'd3-array';
import { localPoint } from '@vx/event';

import defaultTheme from '../../theme/default';
import {
  ChartContext as ChartContextType,
  ChartTheme,
  ScaleConfig,
  RegisterData,
  Margin,
  DatumWithKey,
} from '../../types';
import ChartContext from '../../context/ChartContext';
import createScale from '../../createScale';

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

export default class ChartProvider<XDatum = unknown, YDatum = unknown> extends React.Component<
  ChartProviderProps<XDatum, YDatum>,
  ChartProviderState
> {
  state: ChartProviderState = {
    theme: this.props?.theme ?? defaultTheme,
    dataRegistry: {},
    margin: null,
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
          [dataToRegister.key]: {
            ...dataToRegister,
            mouseEvents: dataToRegister.mouseEvents !== false,
          },
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
        this.setState({ width, height, margin }, this.updateScales);
      }
    },
    50,
  );

  updateScales = () => {
    const { xScale: xScaleConfig, yScale: yScaleConfig } = this.props;
    const { margin, width, height, dataRegistry, combinedData } = this.state;

    if (width != null && height != null) {
      const xScale = createScale<XDatum>({
        data: combinedData.map(({ key, datum }) => dataRegistry[key]?.xAccessor(datum)) as XDatum[],
        scaleConfig: xScaleConfig,
        range: [margin.left, width - margin.right],
      });

      const yScale = createScale<YDatum>({
        data: combinedData.map(({ key, datum }) => dataRegistry[key]?.yAccessor(datum)) as YDatum[],
        scaleConfig: yScaleConfig,
        range: [height - margin.bottom, margin.top],
      });

      this.setState({ xScale, yScale });
    }
  };

  findNearestData = (event: React.MouseEvent | React.TouchEvent, searchRadius = 200) => {
    const { xScale, yScale, dataRegistry } = this.state;
    const { x: svgMouseX, y: svgMouseY } = localPoint(event);
    const mouseX = svgMouseX;
    const mouseY = svgMouseY;

    // for each series find the datums with closest x and y
    const closestData = {};
    let closestDatum: DatumWithKey | null = null;
    let minDeltaX: number = Infinity;
    let minDeltaY: number = Infinity;

    if (xScale && yScale) {
      Object.values(dataRegistry).forEach(({ key, data, xAccessor, yAccessor, mouseEvents }) => {
        if (!mouseEvents) return;

        // find closest datum
        const bisect = bisector(xAccessor).left;

        const isOrdinalScale = !('invert' in xScale && typeof xScale.invert === 'function');
        let closestDatumForKey;
        let closestIndex;
        if (isOrdinalScale) {
          // Ordinal scales don't have an invert function so we do it maually
          const xDomain = xScale.domain();
          const scaledXValues = xDomain.map(val => xScale(val));
          const index = bisectLeft(scaledXValues, mouseX);
          const d0 = data[index - 1];
          const d1 = data[index];
          closestDatumForKey =
            !d0 || Math.abs(dataX - xAccessor(d0)) > Math.abs(dataX - xAccessor(d1)) ? d1 : d0;
          closestIndex = closestDatumForKey === d0 ? index - 1 : index;
        } else {
          const dataX = xScale.invert(mouseX);
          const index = bisect(data, dataX, 0);
          const d0 = data[index - 1];
          const d1 = data[index];
          closestDatumForKey =
            !d0 || Math.abs(dataX - xAccessor(d0)) > Math.abs(dataX - xAccessor(d1)) ? d1 : d0;
          closestIndex = closestDatumForKey === d0 ? index - 1 : index;
        }

        const deltaX = closestDatumForKey
          ? Math.abs(xScale(xAccessor(closestDatumForKey)) - mouseX)
          : Infinity;

        const deltaY = closestDatumForKey
          ? Math.abs(yScale(yAccessor(closestDatumForKey)) - mouseY)
          : Infinity;

        if (closestDatumForKey && (deltaX <= searchRadius || deltaY <= searchRadius)) {
          const datumWithKey = { key, datum: closestDatumForKey, index: closestIndex };
          closestData[key] = datumWithKey;
          closestDatum = deltaY < minDeltaY && deltaX <= minDeltaX ? datumWithKey : closestDatum;
          minDeltaX = Math.min(deltaX, minDeltaX);
          minDeltaY = Math.min(deltaY, minDeltaY);
        }
      });
    }

    return { closestData, closestDatum, svgMouseX, svgMouseY };
  };

  render() {
    const { width, height, margin, xScale, yScale, theme, dataRegistry } = this.state;
    return (
      <ChartContext.Provider
        value={{
          xScale,
          yScale,
          width,
          height,
          margin,
          theme,
          dataRegistry,
          registerData: this.registerData,
          unregisterData: this.unregisterData,
          setChartDimensions: this.setChartDimensions,
          findNearestData: this.findNearestData,
        }}
      >
        {this.props.children}
      </ChartContext.Provider>
    );
  }
}
