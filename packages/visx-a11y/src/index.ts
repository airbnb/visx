'use client';

// @visx/a11y
export {
  DEFAULT_CHART_A11Y_ID_PREFIX,
  DEFAULT_POINT_DESCRIPTION_THRESHOLD,
  DEFAULT_SINGLE_SERIES_LABEL,
  normalizeChartA11yData,
} from './utils/data';
export { getChartAriaProps } from './generators/ariaProps';
export { generateDataTableHTML } from './generators/dataTableHTML';
export { generateChartDescription } from './generators/description';
export { useChartA11y } from './useChartA11y';
export { useChartKeyboardNav } from './useChartKeyboardNav';
export { ChartA11yAnnouncer } from './components/ChartA11yAnnouncer';
export { ChartA11yDataTable } from './components/ChartA11yDataTable';
export type {
  ChartA11yKeyboardIntent,
  ChartA11yKeyboardState,
  ChartA11yMode,
  ChartA11yPointFocus,
} from './keyboard/stateMachine';
export type {
  UseChartA11yAnnouncerProps,
  UseChartA11yDataTableProps,
  UseChartA11yPointProps,
  UseChartA11yResult,
  UseChartA11ySvgProps,
} from './useChartA11y';
export type {
  UseChartKeyboardNavConfig,
  UseChartKeyboardNavPointProps,
  UseChartKeyboardNavResult,
  UseChartKeyboardNavSvgProps,
} from './useChartKeyboardNav';
export type {
  ChartA11yAnnouncerProps,
  ChartA11yLivePoliteness,
} from './components/ChartA11yAnnouncer';
export type { ChartA11yDataTableProps } from './components/ChartA11yDataTable';

export type {
  A11yLocale,
  ChartA11yAccessor,
  ChartA11yConfig,
  ChartA11yFocusedPoint,
  ChartA11yFormatter,
  ChartA11yIds,
  ChartA11yPointProps,
  ChartA11yProps,
  ChartA11ySeriesProps,
  ChartA11ySeriesConfig,
  ChartA11ySvgProps,
  ChartA11yValue,
  ChartType,
} from './types';
export type { NormalizedChartA11yData, NormalizedChartA11ySeries } from './utils/data';
