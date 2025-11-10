import type { AxisScale } from '@visx/axis';
import type { ResizeObserverPolyfill } from '@visx/responsive';
import type { ScaleTypeToD3Scale, ScaleInput } from '@visx/scale';
import type DataRegistry from '../classes/DataRegistry';
import type { XYChartTheme } from './theme';

export type Margin = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type LegendShape = 'rect' | 'line' | 'dashed-line' | 'circle';

export interface DataRegistryEntry<XScale extends AxisScale, YScale extends AxisScale, Datum> {
  /** unique data key */
  key: string;
  /** array of data for the key. */
  data: Datum[];
  /** function that returns the x value of a datum. */
  xAccessor: (d: Datum) => ScaleInput<XScale>;
  /** function that returns the y value of a datum. */
  yAccessor: (d: Datum) => ScaleInput<YScale>;
  /** whether the entry supports mouse events. */
  mouseEvents?: boolean;
  /** Optionally update the xScale. */
  xScale?: <Scale extends AxisScale>(xScale: Scale) => Scale;
  /** Optionally update the yScale. */
  yScale?: <Scale extends AxisScale>(yScale: Scale) => Scale;
  /** Legend shape for the data key. */
  legendShape?: LegendShape;
}

export interface DataContextType<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
> {
  xScale: XScale;
  yScale: YScale;
  colorScale: ScaleTypeToD3Scale<string, string>['ordinal'];
  width: number;
  height: number;
  innerWidth: number;
  innerHeight: number;
  margin: Margin;
  dataRegistry: Omit<DataRegistry<XScale, YScale, Datum>, 'registry' | 'registryKeys'>;
  registerData: (
    data: DataRegistryEntry<XScale, YScale, Datum> | DataRegistryEntry<XScale, YScale, Datum>[],
  ) => void;
  unregisterData: (keyOrKeys: string | string[]) => void;
  setDimensions: (dims: { width: number; height: number; margin: Margin }) => void;
  theme: XYChartTheme;
  horizontal: boolean;
  resizeObserverPolyfill?: ResizeObserverPolyfill;
}
