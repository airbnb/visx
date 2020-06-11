import { GenericScale } from '@vx/axis/lib/types';
import { XYChartTheme } from './theme';

export * from './context';

export type ChartTheme = XYChartTheme;

export type StringLike = string | { toString(): string };
export type NumberLike = number | { valueOf(): number };
export type ScaleOutput = number;

export type ScaleConfigType = 'linear' | 'band' | 'ordinal' | 'time' | 'timeUtc';

export type ScaleConfig<Datum> = {
  type: ScaleConfigType;
  domain?: Datum[];
  range?: number[];
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

export type SeriesProps<Datum, XScaleInput, YScaleInput> = {
  dataKey: string;
  data: Datum[];
  xAccessor: (d: Datum) => XScaleInput;
  yAccessor: (d: Datum) => YScaleInput;
  mouseEvents?: boolean;
};
