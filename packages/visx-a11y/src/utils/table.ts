import type { ChartA11yConfig } from '../types';
import type { NormalizedChartA11yData } from './data';
import { normalizeChartA11yData } from './data';
import { formatXValue, formatYValue, getChartA11yId } from './format';

export const VISUALLY_HIDDEN_STYLE = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
} as const;

export const VISUALLY_HIDDEN_STYLE_STRING =
  'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border:0;';

export type ChartA11yTable = {
  id: string;
  caption: string;
  headers: string[];
  rows: string[][];
};

function getFirstDatumAtIndex<Datum>(normalized: NormalizedChartA11yData<Datum>, index: number) {
  return normalized.series.find(({ data }) => data[index] != null);
}

function getXCell<Datum>(
  config: ChartA11yConfig<Datum>,
  normalized: NormalizedChartA11yData<Datum>,
  index: number,
) {
  const series = getFirstDatumAtIndex(normalized, index);
  const datum = series?.data[index];

  return datum == null || !series ? '' : formatXValue(config, datum, index, series.data);
}

function getYCell<Datum>(
  config: ChartA11yConfig<Datum>,
  normalized: NormalizedChartA11yData<Datum>,
  seriesIndex: number,
  index: number,
) {
  const series = normalized.series[seriesIndex];
  const datum = series?.data[index];

  return datum == null || !series ? '' : formatYValue(config, datum, index, series.data);
}

export function getChartA11yTable<Datum>(config: ChartA11yConfig<Datum>): ChartA11yTable {
  const normalized = normalizeChartA11yData(config);
  const xLabel = config.xLabel ?? (config.chartType === 'histogram' ? 'Bin' : 'Category');
  const yLabel = config.yLabel ?? 'Value';
  const headers = normalized.isMultiSeries
    ? [xLabel, ...normalized.series.map(({ label }) => label)]
    : [
        xLabel,
        normalized.series[0]?.label === 'Data' ? yLabel : normalized.series[0]?.label ?? yLabel,
      ];
  const rows = Array.from({ length: normalized.maxSeriesLength }, (_, index) => {
    const yCells = normalized.isMultiSeries
      ? normalized.series.map(({ index: seriesIndex }) =>
          getYCell(config, normalized, seriesIndex, index),
        )
      : [getYCell(config, normalized, 0, index)];

    return [getXCell(config, normalized, index), ...yCells];
  });

  return {
    id: `${getChartA11yId(config)}-table`,
    caption: config.locale?.dataTableCaption?.(config.title) ?? config.title,
    headers,
    rows,
  };
}
