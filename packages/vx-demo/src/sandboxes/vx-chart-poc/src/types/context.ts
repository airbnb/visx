import { UseTooltipParams } from '@vx/tooltip/lib/hooks/useTooltip';
import { XYChartTheme } from './theme';
import { ScaleType, Margin, ScaleOutput, LegendShape } from '.';

// ChartContext ---------------------------------------------------------------
export interface DataRegistry<Datum = unknown, XScaleInput = unknown, YScaleInput = unknown> {
  [key: string]: {
    /** unique data key */
    key: string;
    /** array of data */
    data: Datum[];
    /** function that returns the x value of a datum. */
    xAccessor: (d: Datum) => XScaleInput;
    /** function that returns the y value of a datum. */
    yAccessor: (d: Datum) => YScaleInput;
    /** whether the entry supports mouse events. */
    mouseEvents?: boolean;
    /** Optionally update the xScale. */
    xScale?: (xScale: ScaleType<XScaleInput, number>) => ScaleType<XScaleInput, number>;
    /** Optionally update the yScale. */
    yScale?: (yScale: ScaleType<YScaleInput, number>) => ScaleType<YScaleInput, number>;
    /** Optionally override logic for finding the nearest data point to a mouse event. */
    findNearestDatum?: FindNearestDatum<Datum, XScaleInput, YScaleInput>;
    /** Legend shape */
    legendShape?: LegendShape;
  };
}

export type RegisterData<Datum, XScaleInput, YScaleInput> = (
  data: DataRegistry<Datum, XScaleInput, YScaleInput>,
) => void;

export type DatumWithKey<Datum = unknown> = { datum: Datum; key: string; index: number };

export type FindNearestDatum<Datum, XScaleInput, YScaleInput> = (
  args: NearestDatumArgs<Datum, XScaleInput, YScaleInput>,
) => null | {
  /** Closest datum. */
  datum: Datum;
  /** Index of the closest datum. */
  index: number;
  /** X coord distance in px from event to datum. Used to rank overall closest datum. */
  distanceX: number;
  /** Y coord distance in px from event to datum. Used to rank overall closest datum. */
  distanceY: number;
};

export interface ChartContext<
  Datum = unknown,
  XScaleInput = unknown,
  YScaleInput = unknown,
  DataKeys extends string = string
> {
  theme: XYChartTheme;
  xScale: ScaleType<XScaleInput, ScaleOutput> | null;
  yScale: ScaleType<YScaleInput, ScaleOutput> | null;
  colorScale: ScaleType<DataKeys, string>;
  width: number | null;
  height: number | null;
  margin: Margin;
  dataRegistry: DataRegistry<Datum, XScaleInput, YScaleInput>;
  registerData: RegisterData<Datum, XScaleInput, YScaleInput>;
  unregisterData: (keyOrKeys: string | string[]) => void;
  setChartDimensions: (dims: { width: number; height: number; margin: Margin }) => void;
  findNearestData: (
    event: React.MouseEvent | React.TouchEvent,
  ) => {
    svgMouseX: number | null;
    svgMouseY: number | null;
    closestDatum: DatumWithKey;
    closestData: { [dataKey: string]: DatumWithKey };
  };
}

export type NearestDatumArgs<Datum = unknown, XScaleInput = unknown, YScaleInput = unknown> = {
  event: React.MouseEvent | React.TouchEvent;
  svgMouseX: number;
  svgMouseY: number;
  xAccessor: (d: Datum) => XScaleInput;
  yAccessor: (d: Datum) => YScaleInput;
  data: Datum[];
  key: string;
} & Pick<
  ChartContext<Datum, XScaleInput, YScaleInput>,
  'xScale' | 'yScale' | 'width' | 'height' | 'margin'
>;

// TooltipContext ---------------------------------------------------------------

export interface TooltipData<Datum = unknown, DataKeys extends string = string> {
  /** x coord of event in svg space. */
  svgMouseX: number | null;
  /** y coord of event in svg space. */
  svgMouseY: number | null;
  /** x coord of event in page space. */
  pageX: number | null;
  /** y coord of event in page space. */
  pageY: number | null;
  /** x coord of the chart contaainer svg from its boundingClientRect. */
  svgOriginX: number | null;
  /** y coord of the chart contaainer svg from its boundingClientRect. */
  svgOriginY: number | null;
  /** The closest datum across all `dataKeys`. */
  closestDatum: DatumWithKey<Datum>;
  /** The closest datum for each `dataKey`. */
  closestData: {
    [key in DataKeys]: DatumWithKey<Datum>;
  };
}

export type TooltipContext = UseTooltipParams<TooltipData>;
