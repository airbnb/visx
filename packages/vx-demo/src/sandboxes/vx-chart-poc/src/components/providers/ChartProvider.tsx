import React from 'react';
import { localPoint } from '@vx/event';
import { scaleOrdinal } from '@vx/scale';

import defaultTheme from '../../theme/default';
import {
  ChartContext as ChartContextType,
  ChartTheme,
  ScaleConfig,
  RegisterData,
  Margin,
  DatumWithKey,
  ScaleType,
} from '../../types';
import ChartContext from '../../context/ChartContext';
import createScale from '../../createScale';
import findNearestDatumXY from '../../util/findNearestDatumXY';

/** Props that can be passed to initialize/update the provider config. */
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
    margin: { top: 30, right: 30, bottom: 30, left: 30 },
    xScale: null,
    yScale: null,
    colorScale: null,
    width: null,
    height: null,
    combinedData: [],
  };

  componentDidUpdate(prevProps: ChartProviderProps<XScaleInput, YScaleInput>) {
    if (
      // @TODO better solution
      JSON.stringify(this.props.xScale) !== JSON.stringify(prevProps.xScale) ||
      JSON.stringify(this.props.yScale) !== JSON.stringify(prevProps.yScale) ||
      JSON.stringify(this.props?.theme?.colors) !== JSON.stringify(prevProps?.theme?.colors)
    ) {
      this.updateScales();
    }
  }

  /** Adds data to the registry and to combined data if it supports events. */
  registerData: RegisterData<XScaleInput, YScaleInput, Datum> = dataToRegister => {
    this.setState(state => {
      const nextState = {
        ...state,
        dataRegistry: {
          ...state.dataRegistry,
          ...Object.values(dataToRegister).reduce(
            (combined, curr) => ({
              ...combined,
              [curr.key]: {
                ...curr,
                mouseEvents: curr.mouseEvents !== false,
              },
            }),
            {},
          ),
        },
        combinedData: [
          ...state.combinedData,
          ...Object.values(dataToRegister).reduce(
            (combined, curr) => [
              ...combined,
              ...curr.data.map((datum, index) => ({
                key: curr.key,
                datum,
                index,
              })),
            ],
            [],
          ),
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
  unregisterData = (keyOrKeys: string | string[]) => {
    const keys = new Set(typeof keyOrKeys === 'string' ? [keyOrKeys] : keyOrKeys);
    this.setState(state => {
      const dataRegistry = Object.entries(state.dataRegistry).reduce((accum, [key, value]) => {
        if (!keys.has(key)) accum[key] = value;
        return accum;
      }, {});

      const nextState = {
        ...state,
        dataRegistry,
        combinedData: state.combinedData.filter(d => !keys.has(d.key)),
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

  getScales = ({
    combinedData,
    dataRegistry,
    margin,
    width,
    height,
  }: ChartProviderState<Datum, XScaleInput, YScaleInput>) => {
    const {
      theme,
      xScale: xScaleConfig,
      yScale: yScaleConfig,
      colorScale: colorScaleConfig,
    } = this.props;

    if (width == null || height == null) return;

    let xScale = createScale<XScaleInput>({
      data: combinedData.map(({ key, datum }) =>
        dataRegistry[key]?.xAccessor(datum),
      ) as XScaleInput[],
      scaleConfig: xScaleConfig,
      range: [margin.left, width - margin.right],
    }) as ScaleType<XScaleInput, number>;

    let yScale = createScale<YScaleInput>({
      data: combinedData.map(({ key, datum }) =>
        dataRegistry[key]?.yAccessor(datum),
      ) as YScaleInput[],
      scaleConfig: yScaleConfig,
      range: [height - margin.bottom, margin.top],
    }) as ScaleType<YScaleInput, number>;

    const colorScale = scaleOrdinal({
      domain: Object.keys(dataRegistry),
      range: theme.colors,
      ...colorScaleConfig,
    });

    // apply any updates to the scales from the registry
    // @TODO this order currently overrides any changes from x/yScaleConfig
    Object.values(dataRegistry).forEach(registry => {
      if (registry.xScale) xScale = registry.xScale(xScale);
      if (registry.yScale) yScale = registry.yScale(yScale);
    });

    return { xScale, yScale, colorScale };
  };

  updateScales = () => {
    const { width, height } = this.state;

    if (width != null && height != null) {
      this.setState(state => this.getScales(state));
    }
  };

  /**  */
  findNearestData = (event: React.MouseEvent | React.TouchEvent) => {
    const { width, height, margin, xScale, yScale, dataRegistry } = this.state;

    // for each series find the datums with closest x and y
    const closestData = {};
    let closestDatum: DatumWithKey | null = null;
    let minDistance: number = Number.POSITIVE_INFINITY;
    const { x: svgMouseX, y: svgMouseY } = localPoint(event) || {};

    if (xScale && yScale && svgMouseX != null && svgMouseY != null) {
      Object.values(dataRegistry).forEach(
        ({
          key,
          data,
          xAccessor,
          yAccessor,
          mouseEvents,
          findNearestDatum = findNearestDatumXY,
        }) => {
          // series has mouse events disabled
          if (!mouseEvents) return;

          const nearestDatum = findNearestDatum({
            event,
            svgMouseX,
            svgMouseY,
            xScale,
            yScale,
            xAccessor,
            yAccessor,
            data,
            width,
            height,
            margin,
            key,
          });

          if (nearestDatum) {
            const { datum, index, distanceX, distanceY } = nearestDatum;
            const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
            closestData[key] = { key, datum, index };
            closestDatum = distance < minDistance ? closestData[key] : closestDatum;
            minDistance = Math.min(distance, minDistance);
          }
        },
      );
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
