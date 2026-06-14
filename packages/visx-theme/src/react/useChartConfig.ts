import type { ChartConfig, ChartSeriesConfig } from '../tokens/types';
import { getCategoricalColor } from './categoricalColor';
import useTheme from './useTheme';
import warn from './warn';

export type ResolvedSeries<K extends string = string> = ChartSeriesConfig & {
  key: K;
  color: string;
};

export type UseChartConfigOptions<K extends string = string> = {
  order?: readonly K[];
};

export type UseChartConfigResult<K extends string = string> = {
  series: ResolvedSeries<K>[];
  getColor: (key: K) => string;
  getLabel: (key: K) => string;
};

const integerLikeKeyPattern = /^(0|[1-9]\d*)$/;

function hasOwnKey<K extends string>(config: ChartConfig<K>, key: string): key is K {
  return Object.prototype.hasOwnProperty.call(config, key);
}

function warnIntegerLikeKeys(keys: readonly string[]) {
  const integerLikeKeys = keys.filter((key) => integerLikeKeyPattern.test(key));

  if (integerLikeKeys.length > 0) {
    warn(
      `[@visx/theme] useChartConfig received integer-like config keys (${integerLikeKeys.join(
        ', ',
      )}) without an explicit order; pass options.order to make series order stable.`,
    );
  }
}

function resolveSeriesOrder<K extends string>(
  config: ChartConfig<K>,
  order: readonly K[] | undefined,
) {
  const configKeys = Object.keys(config) as K[];

  if (order == null) {
    warnIntegerLikeKeys(configKeys);
    return configKeys;
  }

  const seen = new Set<string>();
  const resolvedOrder: K[] = [];

  order.forEach((key) => {
    if (seen.has(key)) {
      warn(`[@visx/theme] useChartConfig ignored duplicate order key "${key}".`);
      return;
    }

    seen.add(key);

    if (!hasOwnKey(config, key)) {
      warn(
        `[@visx/theme] useChartConfig ignored order key "${key}" because it is not present in config.`,
      );
      return;
    }

    resolvedOrder.push(key);
  });

  configKeys.forEach((key) => {
    if (!seen.has(key)) {
      warn(
        `[@visx/theme] useChartConfig omitted config key "${key}" because it is absent from options.order.`,
      );
    }
  });

  return resolvedOrder;
}

export default function useChartConfig<K extends string>(
  config: ChartConfig<K>,
  options: UseChartConfigOptions<K> = {},
): UseChartConfigResult<K> {
  const theme = useTheme();
  const resolvedOrder = resolveSeriesOrder(config, options.order);
  const series = resolvedOrder.map((key, index) => ({
    ...config[key],
    key,
    color: config[key].color ?? getCategoricalColor(theme.colors.categorical, index),
  }));
  const seriesByKey = new Map<string, ResolvedSeries<K>>(
    series.map((resolvedSeries) => [resolvedSeries.key, resolvedSeries]),
  );

  return {
    series,
    getColor: (key) =>
      seriesByKey.get(key)?.color ?? getCategoricalColor(theme.colors.categorical, 0),
    getLabel: (key) => seriesByKey.get(key)?.label ?? key,
  };
}
