import { AxisScaleOutput } from '@vx/axis';
import { ScaleTypeToD3Scale, ScaleConfig, ScaleConfigToD3Scale, ScaleInput } from '@vx/scale';
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
  XScaleConfig extends ScaleConfig<AxisScaleOutput>,
  YScaleConfig extends ScaleConfig<AxisScaleOutput>,
  Datum,
  DataKey extends string = string
> {
  /** unique data key */
  key: DataKey;
  /** array of data for the key. */
  data: Datum[];
  /** function that returns the x value of a datum. */
  xAccessor: (d: Datum) => ScaleInput<ScaleConfigToD3Scale<XScaleConfig, AxisScaleOutput>>;
  /** function that returns the y value of a datum. */
  yAccessor: (d: Datum) => ScaleInput<ScaleConfigToD3Scale<YScaleConfig, AxisScaleOutput>>;
  /** whether the entry supports mouse events. */
  mouseEvents?: boolean;
  /** Optionally update the xScale. */
  xScale?: (
    xScale: ScaleConfigToD3Scale<XScaleConfig, AxisScaleOutput>,
  ) => ScaleConfigToD3Scale<XScaleConfig, AxisScaleOutput>;
  /** Optionally update the yScale. */
  yScale?: (
    yScale: ScaleConfigToD3Scale<YScaleConfig, AxisScaleOutput>,
  ) => ScaleConfigToD3Scale<YScaleConfig, AxisScaleOutput>;
  /** Legend shape for the data key. */
  legendShape?: LegendShape;
}

export interface DataContext<
  XScaleConfig extends ScaleConfig<AxisScaleOutput>,
  YScaleConfig extends ScaleConfig<AxisScaleOutput>,
  Datum,
  DataKey extends string
> {
  xScale: ScaleConfigToD3Scale<XScaleConfig, AxisScaleOutput>;
  yScale: ScaleConfigToD3Scale<YScaleConfig, AxisScaleOutput>;
  colorScale: ScaleTypeToD3Scale<string, DataKey>['ordinal'];
  width: number;
  height: number;
  innerWidth: number;
  innerHeight: number;
  margin: Margin;
  dataRegistry: DataRegistry<XScaleConfig, YScaleConfig, Datum, DataKey>;
  registerData: (
    data:
      | DataRegistryEntry<XScaleConfig, YScaleConfig, Datum, DataKey>
      | DataRegistryEntry<XScaleConfig, YScaleConfig, Datum, DataKey>[],
  ) => void;
  unregisterData: (keyOrKeys: string | string[]) => void;
  setDimensions: (dims: { width: number; height: number; margin: Margin }) => void;
  theme: XYChartTheme;
}
