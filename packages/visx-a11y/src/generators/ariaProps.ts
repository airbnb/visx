import type { ChartA11yConfig, ChartA11yPointProps, ChartA11yProps } from '../types';
import type { NormalizedChartA11ySeries } from '../utils/data';
import { DEFAULT_POINT_DESCRIPTION_THRESHOLD, normalizeChartA11yData } from '../utils/data';
import { formatPercent, formatXValue, formatYValue, getChartA11yId } from '../utils/format';

const defaultChartType = 'chart';

function getChartTypeLabel<Datum>({ chartType, locale }: ChartA11yConfig<Datum>) {
  return (
    (chartType && locale?.chartTypes?.[chartType]) ||
    (chartType ? `${chartType} chart` : locale?.chartRoleDescription ?? defaultChartType)
  );
}

function getPointLabel<Datum>(
  config: ChartA11yConfig<Datum>,
  series: NormalizedChartA11ySeries<Datum>,
  pointIndex: number,
): string {
  const datum = series.data[pointIndex];

  if (datum == null) {
    return '';
  }

  const x = formatXValue(config, datum, pointIndex, series.data);
  const y = formatYValue(config, datum, pointIndex, series.data);

  if (config.chartType === 'pie' || config.chartType === 'donut') {
    const total = series.data.reduce(
      (sum, nextDatum, index) => sum + config.y(nextDatum, index, series.data),
      0,
    );
    const share = total === 0 ? 0 : (config.y(datum, pointIndex, series.data) / total) * 100;

    return `${x}, ${y} (${formatPercent(share)})`;
  }

  return `${series.label}, ${x}, ${y}`;
}

export function getChartAriaProps<Datum>(config: ChartA11yConfig<Datum>): ChartA11yProps {
  const normalized = normalizeChartA11yData(config);
  const id = getChartA11yId(config);
  const descriptionId = `${id}-description`;
  const tableId = `${id}-table`;
  const chartTypeLabel = getChartTypeLabel(config);
  const pointDescriptionThreshold =
    config.pointDescriptionThreshold ?? DEFAULT_POINT_DESCRIPTION_THRESHOLD;
  const includePointProps = normalized.pointCount <= pointDescriptionThreshold;

  return {
    ids: {
      rootId: id,
      descriptionId,
      tableId,
    },
    svg: {
      role: 'graphics-document',
      'aria-roledescription': chartTypeLabel,
      'aria-label': config.title,
      'aria-describedby': descriptionId,
    },
    series: normalized.series.map((series) => ({
      role: 'graphics-object',
      'aria-roledescription': config.locale?.seriesRoleDescription ?? 'series',
      'aria-label': series.label,
    })),
    points: includePointProps
      ? normalized.series.map((series) =>
          series.data.map<ChartA11yPointProps>((_, index) => ({
            role: 'graphics-symbol',
            'aria-roledescription': config.locale?.pointRoleDescription ?? 'data point',
            'aria-label': getPointLabel(config, series, index),
          })),
        )
      : normalized.series.map(() => []),
  };
}
