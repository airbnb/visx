import { GenericScale } from '@vx/axis/lib/types';
import { XYChartTheme } from './theme';

export type ChartTheme = XYChartTheme;

export type ScaleConfigType = 'linear' | 'band' | 'ordinal' | 'time' | 'timeUtc';

export type ScaleConfig = {
  type: ScaleConfigType;
  domain?: unknown[];
  range?: unknown[];
  includeZero?: boolean;
  nice?: boolean;
};

export type ScaleType<ScaleInput> = GenericScale<ScaleInput>;

export type Margin = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type DataRegistry = {
  [key: string]: {
    key: string;
    data: unknown[];
    xAccessor: (d: unknown) => unknown;
    yAccessor: (d: unknown) => unknown;
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
