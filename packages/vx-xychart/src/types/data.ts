import { AxisScale } from '@vx/axis';
import { D3Scale, InferD3ScaleOutput, ScaleTypeToD3Scale } from '@vx/scale';
import { DataRegistry } from '../hooks/useDataRegistry';
import { XYChartTheme } from './theme';

export type Margin = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type LegendShape = 'rect' | 'line' | 'dashed-line' | 'circle';

export interface DataRegistryEntry<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum,
  DataKey extends string = string
> {
  /** unique data key */
  key: DataKey;
  /** array of data for the key. */
  data: Datum[];
  /** function that returns the x value of a datum. */
  xAccessor: (d: Datum) => InferD3ScaleOutput<XScale>;
  /** function that returns the y value of a datum. */
  yAccessor: (d: Datum) => InferD3ScaleOutput<YScale>;
  /** whether the entry supports mouse events. */
  mouseEvents?: boolean;
  /** Optionally update the xScale. */
  xScale?: (xScale: XScale) => XScale;
  /** Optionally update the yScale. */
  yScale?: (yScale: YScale) => YScale;
  /** Legend shape for the data key. */
  legendShape?: LegendShape;
}

export interface DataContext<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum,
  DataKey extends string
> {
  xScale: XScale;
  yScale: YScale;
  colorScale: ScaleTypeToD3Scale<string, DataKey>['ordinal'];
  width: number;
  height: number;
  innerWidth: number;
  innerHeight: number;
  margin: Margin;
  dataRegistry: DataRegistry<XScale, YScale, Datum, DataKey>;
  registerData: (
    data:
      | DataRegistryEntry<XScale, YScale, Datum, DataKey>
      | DataRegistryEntry<XScale, YScale, Datum, DataKey>[],
  ) => void;
  unregisterData: (keyOrKeys: string | string[]) => void;
  setDimensions: (dims: { width: number; height: number; margin: Margin }) => void;
  theme: XYChartTheme;
}
