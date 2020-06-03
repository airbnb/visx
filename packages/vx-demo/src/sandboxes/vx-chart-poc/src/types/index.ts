import { GenericScale } from '@vx/axis/lib/types';
import { XYChartTheme } from './theme';

export type ChartTheme = XYChartTheme;

export type StringLike = string | { toString(): string };
export type NumberLike = number | { valueOf(): number };
export type ScaleOutput = number;

export type ScaleConfigType = 'linear' | 'band' | 'ordinal' | 'time' | 'timeUtc';

export type ScaleConfig<Datum> = {
  type: ScaleConfigType;
  domain?: Datum[];
  range?: ScaleOutput[];
  includeZero?: boolean;
  nice?: boolean;
  clamp?: boolean;
};

export type ScaleType<ScaleInput> = GenericScale<ScaleInput>;

export type Margin = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type DatumWithKey = { datum: unknown; key: string; index: number };

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

export type ChartContext<XScaleInput = unknown, YScaleInput = unknown> = {
  theme: XYChartTheme;
  xScale: ScaleType<XScaleInput> | null;
  yScale: ScaleType<YScaleInput> | null;
  width: number | null;
  height: number | null;
  dataRegistry: DataRegistry;
  registerData: RegisterData;
  unregisterData: (key: string) => void;
  setChartDimensions: (dims: { width: number; height: number; margin?: Margin }) => void;
};
