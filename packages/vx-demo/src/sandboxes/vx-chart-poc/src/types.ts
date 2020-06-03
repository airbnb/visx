export type ChartTheme = Object;

export type ScaleConfigType = 'linear' | 'band' | 'ordinal' | 'time' | 'timeUtc';

export type ScaleConfig = {
  type: ScaleConfigType;
  domain?: unknown[];
  range?: unknown[];
  includeZero?: boolean;
  nice?: boolean;
};

export type ScaleType = Function;

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
  };
};

export type RegisterData = (data: {
  key: DataRegistry[string]['key'];
  data: DataRegistry[string]['data'];
  xAccessor: DataRegistry[string]['xAccessor'];
  yAccessor: DataRegistry[string]['yAccessor'];
}) => void;

export type ChartContext = {
  theme: ChartTheme;
  xScale: ScaleType | null;
  yScale: ScaleType | null;
  width: number | null;
  height: number | null;
  dataRegistry: DataRegistry;
  registerData: RegisterData;
  unregisterData: (key: string) => void;
  setChartDimensions: (dims: { width: number; height: number; margin?: Margin }) => void;
};
