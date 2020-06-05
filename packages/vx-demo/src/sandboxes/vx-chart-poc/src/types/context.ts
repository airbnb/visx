import { UseTooltipParams } from '@vx/tooltip/lib/hooks/useTooltip';
import { XYChartTheme } from './theme';
import { ScaleType, Margin } from '.';

// ChartContext ---------------------------------------------------------------
export type DataRegistry = {
  [key: string]: {
    /** unique data key */
    key: string;
    /** array of data */
    data: unknown[];
    /** function that returns the x value of a datum. */
    xAccessor: (d: unknown) => unknown;
    /** function that returns the y value of a datum. */
    yAccessor: (d: unknown) => unknown;
    /** whether the entry supports mouse events. */
    mouseEvents: boolean;
  };
};

export type RegisterData = (data: {
  key: DataRegistry[string]['key'];
  data: DataRegistry[string]['data'];
  xAccessor: DataRegistry[string]['xAccessor'];
  yAccessor: DataRegistry[string]['yAccessor'];
  mouseEvents?: boolean;
}) => void;

export type DatumWithKey = { datum: unknown; key: string; index: number };

export type ChartContext<XScaleInput = unknown, YScaleInput = unknown> = {
  theme: XYChartTheme;
  xScale: ScaleType<XScaleInput> | null;
  yScale: ScaleType<YScaleInput> | null;
  width: number | null;
  height: number | null;
  margin: Margin;
  dataRegistry: DataRegistry;
  registerData: RegisterData;
  unregisterData: (key: string) => void;
  setChartDimensions: (dims: { width: number; height: number; margin: Margin }) => void;
  findNearestData: (
    event: React.MouseEvent | React.TouchEvent,
  ) => {
    svgMouseX: number | null;
    svgMouseY: number | null;
    closestDatum: DatumWithKey;
    closestData;
  };
};

// EventContext ---------------------------------------------------------------

export interface TooltipData {
  svgMouseX: number | null;
  svgMouseY: number | null;
  closestDatum: DatumWithKey;
  closestData: {
    [key: string]: DatumWithKey;
  };
}

export type EventContext = UseTooltipParams<TooltipData>;
