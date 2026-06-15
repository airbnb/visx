import type { ChartA11yConfig } from '../types';
import { DEFAULT_POINT_DESCRIPTION_THRESHOLD, normalizeChartA11yData } from '../utils/data';
import { formatPercent, formatXValue, formatYValue } from '../utils/format';

type NumericPoint = {
  x: string;
  y: number;
  yLabel: string;
};

function getChartTypeLabel<Datum>({ chartType, locale }: ChartA11yConfig<Datum>) {
  return (
    (chartType && locale?.chartTypes?.[chartType]) ||
    (chartType ? `${chartType} chart` : locale?.chartRoleDescription ?? 'Chart')
  );
}

function collectNumericPoints<Datum>(config: ChartA11yConfig<Datum>): NumericPoint[] {
  return normalizeChartA11yData(config).series.flatMap((series) =>
    series.data
      .map((datum, index) => ({
        x: formatXValue(config, datum, index, series.data),
        y: config.y(datum, index, series.data),
        yLabel: formatYValue(config, datum, index, series.data),
      }))
      .filter(({ y }) => Number.isFinite(y)),
  );
}

function generateDenseDescription<Datum>(config: ChartA11yConfig<Datum>) {
  const points = collectNumericPoints(config);

  if (points.length === 0) {
    return `${getChartTypeLabel(config)} "${config.title}" has no numeric values.`;
  }

  const { min, max, sum } = points.reduce(
    (stats, { y }) => ({
      min: Math.min(stats.min, y),
      max: Math.max(stats.max, y),
      sum: stats.sum + y,
    }),
    { min: points[0].y, max: points[0].y, sum: 0 },
  );
  const mean = sum / points.length;

  return `${getChartTypeLabel(config)} of ${config.title}. ${
    points.length
  } data points. Values range from ${config.formatY?.(min) ?? String(min)} to ${
    config.formatY?.(max) ?? String(max)
  } with an average of ${config.formatY?.(mean) ?? String(Math.round(mean * 100) / 100)}.`;
}

function generatePieDescription<Datum>(config: ChartA11yConfig<Datum>) {
  const series = normalizeChartA11yData(config).series[0];

  if (!series || series.data.length === 0) {
    return `${getChartTypeLabel(config)} "${config.title}" has no segments.`;
  }

  const segments = series.data.map((datum, index) => ({
    label: formatXValue(config, datum, index, series.data),
    value: config.y(datum, index, series.data),
    formattedValue: formatYValue(config, datum, index, series.data),
  }));
  const total = segments.reduce((sum, { value }) => sum + value, 0);
  const sorted = [...segments].sort((a, b) => a.value - b.value);
  const smallest = sorted[0];
  const largest = sorted[sorted.length - 1];
  const formatSegment = (segment: (typeof segments)[number]) => {
    const share = total === 0 ? 0 : (segment.value / total) * 100;

    return `${segment.label}, ${segment.formattedValue} (${formatPercent(share)})`;
  };

  return `${getChartTypeLabel(config)} of ${config.title}. ${
    segments.length
  } segments. Largest: ${formatSegment(largest)}. Smallest: ${formatSegment(smallest)}.`;
}

function generateSmallSeriesDescription<Datum>(config: ChartA11yConfig<Datum>) {
  const points = collectNumericPoints(config);

  if (points.length === 0) {
    return `${getChartTypeLabel(config)} "${config.title}" has no numeric values.`;
  }

  const first = points[0];
  const last = points[points.length - 1];
  const min = points.reduce((lowest, point) => (point.y < lowest.y ? point : lowest), points[0]);
  const max = points.reduce((highest, point) => (point.y > highest.y ? point : highest), points[0]);

  return `${getChartTypeLabel(config)} of ${config.title} over ${
    points.length
  } data points. Values start at ${first.yLabel} for ${first.x}, end at ${last.yLabel} for ${
    last.x
  }, range from ${min.yLabel} at ${min.x} to ${max.yLabel} at ${max.x}.`;
}

export function generateChartDescription<Datum>(config: ChartA11yConfig<Datum>): string {
  if (config.description) {
    return config.description;
  }

  const normalized = normalizeChartA11yData(config);
  const threshold = config.pointDescriptionThreshold ?? DEFAULT_POINT_DESCRIPTION_THRESHOLD;

  if (normalized.pointCount === 0) {
    return `${getChartTypeLabel(config)} "${config.title}" has no data.`;
  }

  if (config.chartType === 'pie' || config.chartType === 'donut') {
    return generatePieDescription(config);
  }

  if (
    normalized.pointCount > threshold ||
    config.chartType === 'scatter' ||
    config.chartType === 'heatmap'
  ) {
    return generateDenseDescription(config);
  }

  return generateSmallSeriesDescription(config);
}
