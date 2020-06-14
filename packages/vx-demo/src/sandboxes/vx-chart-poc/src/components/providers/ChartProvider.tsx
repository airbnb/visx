import React from 'react';
import { localPoint } from '@vx/event';
import { scaleOrdinal } from '@vx/scale';
import { voronoi } from '@vx/voronoi';

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
import { defaultStyles } from '@vx/tooltip';
import { valueOf } from '!!raw-loader!*';

export type ChartProviderProps<XScaleInput, YScaleInput> = {
  theme?: ChartTheme;
  xScale: ScaleConfig<XScaleInput>;
  yScale: ScaleConfig<YScaleInput>;
  colorScale?: { domain?: string[] };
  children: React.ReactNode;
};

type ChartProviderState<Datum, XScaleInput, YScaleInput> = Pick<
  ChartContextType<Datum, XScaleInput, YScaleInput>,
  'xScale' | 'yScale' | 'colorScale' | 'dataRegistry'
> & {
  width: number | null;
  height: number | null;
  margin: Margin;
  combinedData: DatumWithKey<Datum>[];
};

export default class ChartProvider<
  Datum = unknown,
  XScaleInput = unknown,
  YScaleInput = unknown
> extends React.Component<
  ChartProviderProps<XScaleInput, YScaleInput>,
  ChartProviderState<Datum, XScaleInput, YScaleInput>
> {
  static defaultProps = {
    theme: defaultTheme,
  };

  state: ChartProviderState<Datum, XScaleInput, YScaleInput> = {
    dataRegistry: {},
    margin: null,
    xScale: null,
    yScale: null,
    colorScale: null,
    width: null,
    height: null,
    combinedData: [],
  };

  /** Adds data to the registry and to combined data if it supports events. */
  registerData: RegisterData = dataToRegister => {
    this.setState(state => {
      const nextState = {
        ...state,
        dataRegistry: {
          ...state.dataRegistry,
          [dataToRegister.key]: {
            ...dataToRegister,
            mouseEvents: dataToRegister.mouseEvents !== false,
          },
        },
        combinedData: [
          ...state.combinedData,
          ...dataToRegister.data.map((datum, index) => ({
            key: dataToRegister.key,
            datum,
            index,
          })),
        ],
      };

      // it's important that the registry and scales are kept in sync so that
      // consumers don't used mismatched data + scales
      return {
        ...nextState,
        ...this.getScales(nextState),
      };
    });
  };

  /** Removes data from the registry and combined data. */
  unregisterData = (key: string) => {
    this.setState(state => {
      const { [key]: omit, ...restRegistry } = state.dataRegistry;

      const nextState = {
        ...state,
        dataRegistry: { ...restRegistry },
        combinedData: state.combinedData.filter(d => d.key !== key),
      };

      return {
        ...nextState,
        ...this.getScales(nextState),
      };
    });
  };

  /** Sets chart dimensions. */
  setChartDimensions: ChartContextType['setChartDimensions'] = ({ width, height, margin }) => {
    if (width > 0 && height > 0) {
      this.setState({ width, height, margin }, this.updateScales);
    }
  };

  getScales = ({ combinedData, dataRegistry, margin, width, height }: ChartProviderState) => {
    const {
      theme,
      xScale: xScaleConfig,
      yScale: yScaleConfig,
      colorScale: colorScaleConfig,
    } = this.props;

    if (width == null || height == null) return;

    const xScale = createScale<XScaleInput>({
      data: combinedData.map(({ key, datum }) =>
        dataRegistry[key]?.xAccessor(datum),
      ) as XScaleInput[],
      scaleConfig: xScaleConfig,
      range: [margin.left, width - margin.right],
    });

    const yScale = createScale<YScaleInput>({
      data: combinedData.map(({ key, datum }) =>
        dataRegistry[key]?.yAccessor(datum),
      ) as YScaleInput[],
      scaleConfig: yScaleConfig,
      range: [height - margin.bottom, margin.top],
    });

    const colorScale = scaleOrdinal({
      domain: Object.keys(dataRegistry),
      range: theme.colors,
      ...colorScaleConfig,
    });

    return { xScale, yScale, colorScale };
  };

  updateScales = () => {
    const { width, height } = this.state;

    if (width != null && height != null) {
      this.setState(state => this.getScales(state));
    }
  };

  // @TODO move to util function, support registry overrides
  findNearestData = (event: React.MouseEvent | React.TouchEvent) => {
    const { width, height, xScale, yScale, dataRegistry } = this.state;
    const { x: svgMouseX, y: svgMouseY } = localPoint(event);

    // for each series find the datums with closest x and y
    const closestData = {};
    let closestDatum: DatumWithKey | null = null;
    let minDeltaX: number = Number.POSITIVE_INFINITY;
    let minDeltaY: number = Number.POSITIVE_INFINITY;
    let minTotalDelta: number = Number.POSITIVE_INFINITY;

    if (xScale && yScale) {
      Object.values(dataRegistry).forEach(({ key, data, xAccessor, yAccessor, mouseEvents }) => {
        if (!mouseEvents) return;
        const scaledX = (d: unknown) => xScale(xAccessor(d)) as number;
        const scaledY = (d: unknown) => yScale(yAccessor(d)) as number;

        // Create a voronoi with each node center points
        const voronoiInstance = voronoi({
          x: scaledX,
          y: scaledY,
          width,
          height,
        });

        const foundPoint = voronoiInstance(data).find(svgMouseX, svgMouseY);

        const deltaX = foundPoint
          ? Math.abs(scaledX(foundPoint.data) - svgMouseX)
          : Number.POSITIVE_INFINITY;

        const deltaY = foundPoint
          ? Math.abs(scaledY(foundPoint.data) - svgMouseY)
          : Number.POSITIVE_INFINITY;

        const datumWithKey = { key, datum: foundPoint.data, index: foundPoint.index };
        closestData[key] = datumWithKey;

        // now update the overall closest datum
        const totalDelta = deltaX + deltaY;
        closestDatum = totalDelta < minTotalDelta ? datumWithKey : closestDatum;
        minDeltaX = Math.min(deltaX, minDeltaX);
        minDeltaY = Math.min(deltaY, minDeltaY);
        minTotalDelta = Math.min(totalDelta, minTotalDelta);
      });
    }

    return { closestData, closestDatum, svgMouseX, svgMouseY };
  };

  render() {
    const { theme } = this.props;
    const { width, height, margin, xScale, yScale, colorScale, dataRegistry } = this.state;
    return (
      <ChartContext.Provider
        value={{
          xScale,
          yScale,
          colorScale,
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
