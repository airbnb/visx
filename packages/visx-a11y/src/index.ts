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
export type {
  ChartA11yKeyboardIntent,
  ChartA11yKeyboardState,
  ChartA11yMode,
  ChartA11yPointFocus,
} from './keyboard/stateMachine';

export type {
  A11yLocale,
  ChartA11yAccessor,
  ChartA11yConfig,
  ChartA11yFlatConfig,
  ChartA11yFocusedPoint,
  ChartA11yFormatter,
  ChartA11yIds,
  ChartA11yNestedConfig,
  ChartA11yPointProps,
  ChartA11yProps,
  ChartA11ySeriesProps,
  ChartA11ySeriesConfig,
  ChartA11ySvgProps,
  ChartA11yValue,
  ChartType,
} from './types';
export type { NormalizedChartA11yData, NormalizedChartA11ySeries } from './utils/data';
