export const CATEGORICAL_COLOR_COUNT = 12;
export const MIN_CATEGORICAL_COLOR_COUNT = 5;

export const categoricalCssVarNames = [
  '--chart-1',
  '--chart-2',
  '--chart-3',
  '--chart-4',
  '--chart-5',
  '--chart-6',
  '--chart-7',
  '--chart-8',
  '--chart-9',
  '--chart-10',
  '--chart-11',
  '--chart-12',
] as const;

export const cssVarNames = {
  categorical: categoricalCssVarNames,

  sequentialFrom: '--chart-scale-from',
  sequentialTo: '--chart-scale-to',
  divergingNegative: '--chart-diverge-low',
  divergingNeutral: '--chart-diverge-mid',
  divergingPositive: '--chart-diverge-high',

  background: '--background',
  surface: '--card',
  border: '--border',
  textPrimary: '--foreground',
  textMuted: '--muted-foreground',

  positive: '--chart-positive',
  negative: '--chart-negative',
  highlight: '--chart-highlight',

  axisStroke: '--visx-axis-stroke',
  axisTickStroke: '--visx-axis-tick-stroke',
  gridStroke: '--visx-grid-stroke',

  fontFamily: '--visx-font-family',
} as const;

export const shadcnFallbackCssVarNames = {
  destructive: '--destructive',
  muted: '--muted',
  primary: '--primary',
} as const;
