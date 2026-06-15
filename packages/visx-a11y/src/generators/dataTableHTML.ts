import type { ChartA11yConfig } from '../types';
import type { NormalizedChartA11yData } from '../utils/data';
import { normalizeChartA11yData } from '../utils/data';
import { escapeHtml, formatXValue, formatYValue, getChartA11yId } from '../utils/format';

export const VISUALLY_HIDDEN_TABLE_STYLE =
  'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border:0;';

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

export function generateDataTableHTML<Datum>(config: ChartA11yConfig<Datum>): string {
  const normalized = normalizeChartA11yData(config);
  const tableId = `${getChartA11yId(config)}-table`;
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
  const headerHtml = headers.map((header) => `<th scope="col">${escapeHtml(header)}</th>`).join('');
  const rowHtml = rows
    .map(
      ([xCell, ...yCells]) =>
        `<tr><th scope="row">${escapeHtml(xCell)}</th>${yCells
          .map((cell) => `<td>${escapeHtml(cell)}</td>`)
          .join('')}</tr>`,
    )
    .join('');
  const tableIdHtml = escapeHtml(tableId);
  const captionHtml = escapeHtml(config.locale?.dataTableCaption?.(config.title) ?? config.title);

  return `<table id="${tableIdHtml}" style="${VISUALLY_HIDDEN_TABLE_STYLE}"><caption>${captionHtml}</caption><thead><tr>${headerHtml}</tr></thead><tbody>${rowHtml}</tbody></table>`;
}
