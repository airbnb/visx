import type { ChartA11yConfig, ChartA11ySeriesConfig } from '../types';

export const DEFAULT_CHART_A11Y_ID_PREFIX = 'visx-a11y';
export const DEFAULT_POINT_DESCRIPTION_THRESHOLD = 150;
export const DEFAULT_SINGLE_SERIES_LABEL = 'Data';

export type NormalizedChartA11ySeries<Datum> = {
  index: number;
  label: string;
  data: readonly Datum[];
};

export type NormalizedChartA11yData<Datum> = {
  series: NormalizedChartA11ySeries<Datum>[];
  isMultiSeries: boolean;
  pointCount: number;
  maxSeriesLength: number;
};

function isNestedSeriesData<Datum>(
  data: ChartA11yConfig<Datum>['data'],
  seriesConfig: readonly ChartA11ySeriesConfig<Datum>[] | undefined,
): data is readonly (readonly Datum[])[] {
  const firstDatum = data[0];

  if (!Array.isArray(firstDatum)) {
    return false;
  }

  if ((seriesConfig?.length ?? 0) > 1) {
    return true;
  }

  return Array.isArray(firstDatum[0]);
}

function getSeriesLabel<Datum>(
  seriesConfig: ChartA11ySeriesConfig<Datum> | undefined,
  seriesIndex: number,
  seriesCount: number,
) {
  if (typeof seriesConfig?.label === 'function') {
    return seriesConfig.label(seriesIndex);
  }

  if (seriesConfig?.label) {
    return seriesConfig.label;
  }

  return seriesCount === 1 ? DEFAULT_SINGLE_SERIES_LABEL : `Series ${seriesIndex + 1}`;
}

export function normalizeChartA11yData<Datum>({
  data,
  series: seriesConfig,
}: Pick<ChartA11yConfig<Datum>, 'data' | 'series'>): NormalizedChartA11yData<Datum> {
  let seriesData: readonly (readonly Datum[])[];

  if (seriesConfig?.some((series) => series.data)) {
    seriesData = seriesConfig.map((series) => series.data ?? []);
  } else if (isNestedSeriesData(data, seriesConfig)) {
    seriesData = data;
  } else {
    seriesData = [data];
  }

  const series = seriesData.map((seriesDatum, index) => ({
    index,
    label: getSeriesLabel(seriesConfig?.[index], index, seriesData.length),
    data: seriesDatum,
  }));
  const maxSeriesLength = series.reduce(
    (maxLength, { data: seriesDatum }) => Math.max(maxLength, seriesDatum.length),
    0,
  );
  const pointCount = series.reduce((total, { data: seriesDatum }) => total + seriesDatum.length, 0);

  return {
    series,
    isMultiSeries: series.length > 1,
    pointCount,
    maxSeriesLength,
  };
}
