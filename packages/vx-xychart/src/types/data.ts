import { AxisScale } from '@vx/axis';
import { D3Scale, InferD3ScaleOutput } from '@vx/scale';

export type Margin = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type LegendShape = 'rect' | 'line' | 'dashed-line' | 'circle';

/** Register one or more keys in the data registry. */
export type RegisterData<Datum, XScale extends AxisScale, YScale extends AxisScale> = (
  data: DataRegistry<Datum, XScale, YScale>,
) => void;

export interface DataRegistry<Datum, XScale extends AxisScale, YScale extends AxisScale> {
  [key: string]: {
    /** unique data key */
    key: string;
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
  };
}

export interface DataContext<
  Datum = unknown,
  XScale extends AxisScale = AxisScale,
  YScale extends AxisScale = AxisScale,
  DataKeys extends string = string
> {
  xScale: XScale | null;
  yScale: YScale | null;
  colorScale: D3Scale<DataKeys, string> | null;
  width: number | null;
  height: number | null;
  innerWidth: number | null;
  innerHeight: number | null;
  margin: Margin;
  dataRegistry: DataRegistry<Datum, XScale, YScale>;
  registerData: RegisterData<Datum, XScale, YScale>;
  unregisterData: (keyOrKeys: string | string[]) => void;
  setDimensions: (dims: { width: number; height: number; margin: Margin }) => void;
}
