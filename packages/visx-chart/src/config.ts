import type { ComponentType } from 'react';

export type ChartTheme = 'light' | 'dark';

export type ChartConfigItem = {
  label?: string;
  color?: string;
  theme?: Partial<Record<ChartTheme, string>>;
  icon?: ComponentType<{ className?: string }>;
};

export type ChartConfig = Record<string, ChartConfigItem>;

export function getChartConfigEntry(config: ChartConfig | undefined, key: string) {
  return config?.[key];
}

export function getChartConfigLabel(config: ChartConfig | undefined, key: string, fallback = key) {
  return getChartConfigEntry(config, key)?.label ?? fallback;
}

export function getChartConfigColor(
  config: ChartConfig | undefined,
  key: string,
  fallback?: string,
  theme?: ChartTheme,
) {
  const entry = getChartConfigEntry(config, key);

  return (theme ? entry?.theme?.[theme] : undefined) ?? entry?.color ?? fallback;
}

export function getChartConfigIcon(config: ChartConfig | undefined, key: string) {
  return getChartConfigEntry(config, key)?.icon;
}

export function getChartCssVariableName(key: string) {
  return `--color-${key.replace(/[^\w-]/g, '-')}`;
}

export function getChartCssVariables(config: ChartConfig | undefined, theme?: ChartTheme) {
  return Object.fromEntries(
    Object.keys(config ?? {})
      .map((key) => [
        getChartCssVariableName(key),
        getChartConfigColor(config, key, undefined, theme),
      ])
      .filter((entry): entry is [string, string] => entry[1] != null),
  );
}
