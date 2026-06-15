import type { ChartA11yConfig } from '../types';
import { DEFAULT_CHART_A11Y_ID_PREFIX } from './data';

const unsafeHtmlPattern = /["&'<>]/g;
const unsafeHtmlReplacements: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^\da-z]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function escapeHtml(value: unknown) {
  return String(value).replace(unsafeHtmlPattern, (match) => unsafeHtmlReplacements[match]);
}

export function formatChartA11yValue(value: unknown) {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value);
  }

  return String(value);
}

export function getChartA11yId<Datum>({
  id,
  idPrefix = DEFAULT_CHART_A11Y_ID_PREFIX,
  title,
}: Pick<ChartA11yConfig<Datum>, 'id' | 'idPrefix' | 'title'>) {
  return id ?? `${idPrefix}-${slugify(title) || 'chart'}`;
}

export function formatXValue<Datum>(
  config: Pick<ChartA11yConfig<Datum>, 'formatX' | 'x'>,
  datum: Datum,
  index: number,
  data: readonly Datum[],
) {
  const value = config.x(datum, index, data);

  return config.formatX?.(value) ?? formatChartA11yValue(value);
}

export function formatYValue<Datum>(
  config: Pick<ChartA11yConfig<Datum>, 'formatY' | 'y'>,
  datum: Datum,
  index: number,
  data: readonly Datum[],
) {
  const value = config.y(datum, index, data);

  return config.formatY?.(value) ?? formatChartA11yValue(value);
}

export function formatPercent(value: number) {
  if (!Number.isFinite(value)) {
    return '0%';
  }

  return `${Math.round(value * 10) / 10}%`;
}
