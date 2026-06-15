'use client';

// @visx/a11y
export {
  DEFAULT_CHART_A11Y_ID_PREFIX,
  DEFAULT_POINT_DESCRIPTION_THRESHOLD,
  DEFAULT_SINGLE_SERIES_LABEL,
  normalizeChartA11yData,
} from './utils/data';

export type {
  A11yLocale,
  ChartA11yAccessor,
  ChartA11yConfig,
  ChartA11yFocusedPoint,
  ChartA11yFormatter,
  ChartA11ySeriesConfig,
  ChartA11yValue,
  ChartType,
} from './types';
export type { NormalizedChartA11yData, NormalizedChartA11ySeries } from './utils/data';
