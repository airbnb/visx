import React from 'react';

export type ChartTooltipItem<Datum = unknown> = {
  key: string;
  datum?: Datum;
  index?: number;
  label?: React.ReactNode;
  value?: React.ReactNode;
  rawValue?: unknown;
  color?: string;
  x?: number;
  y?: number;
  distance?: number;
  hidden?: boolean;
  payload?: unknown;
};

export type ChartTooltipConfig<Datum = unknown> = Record<
  string,
  {
    label?: React.ReactNode | ((item: ChartTooltipItem<Datum>) => React.ReactNode);
    color?: string | ((item: ChartTooltipItem<Datum>) => string | undefined);
    icon?: React.ComponentType<{ item: ChartTooltipItem<Datum> }>;
    formatValue?: (value: unknown, item: ChartTooltipItem<Datum>) => React.ReactNode;
    formatLabel?: (item: ChartTooltipItem<Datum>) => React.ReactNode;
    hide?: boolean;
    order?: number;
  }
>;

export type ChartTooltipIndicator = 'dot' | 'line' | 'dashed' | 'square' | 'none';

export type ChartTooltipLabelRenderParams<Datum = unknown> = {
  label: React.ReactNode;
  items: ChartTooltipItem<Datum>[];
  config?: ChartTooltipConfig<Datum>;
};

export type ChartTooltipItemRenderParams<Datum = unknown> = {
  item: ChartTooltipItem<Datum>;
  configEntry?: ChartTooltipConfig<Datum>[string];
  label: React.ReactNode;
  value: React.ReactNode;
  color?: string;
  indicator: ChartTooltipIndicator;
};

export type ChartTooltipValueRenderParams<Datum = unknown> =
  ChartTooltipItemRenderParams<Datum>;

export type ChartTooltipContentProps<Datum = unknown> =
  React.HTMLAttributes<HTMLDivElement> & {
    label?: React.ReactNode;
    items: ChartTooltipItem<Datum>[];
    config?: ChartTooltipConfig<Datum>;
    indicator?: ChartTooltipIndicator;
    hideLabel?: boolean;
    hideIndicator?: boolean;
    sortItems?: (a: ChartTooltipItem<Datum>, b: ChartTooltipItem<Datum>) => number;
    renderLabel?: (params: ChartTooltipLabelRenderParams<Datum>) => React.ReactNode;
    renderItem?: (params: ChartTooltipItemRenderParams<Datum>) => React.ReactNode;
    renderValue?: (params: ChartTooltipValueRenderParams<Datum>) => React.ReactNode;
    getItemKey?: (item: ChartTooltipItem<Datum>, index: number) => React.Key;
    'data-testid'?: string;
  };

type VisibleItem<Datum> = {
  configEntry?: ChartTooltipConfig<Datum>[string];
  index: number;
  item: ChartTooltipItem<Datum>;
};

function getConfigEntry<Datum>(
  item: ChartTooltipItem<Datum>,
  config?: ChartTooltipConfig<Datum>,
) {
  return config?.[item.key];
}

function getItemLabel<Datum>(
  item: ChartTooltipItem<Datum>,
  configEntry?: ChartTooltipConfig<Datum>[string],
) {
  if (configEntry?.formatLabel) return configEntry.formatLabel(item);

  if (typeof configEntry?.label === 'function') return configEntry.label(item);
  if (configEntry?.label != null) return configEntry.label;
  if (item.label != null) return item.label;

  return item.key;
}

function getItemValue<Datum>(
  item: ChartTooltipItem<Datum>,
  configEntry?: ChartTooltipConfig<Datum>[string],
) {
  const formatterValue = item.rawValue !== undefined ? item.rawValue : item.value;

  if (configEntry?.formatValue) return configEntry.formatValue(formatterValue, item);
  if (item.value != null) return item.value;
  if (item.rawValue != null) return String(item.rawValue);

  return '';
}

function getItemColor<Datum>(
  item: ChartTooltipItem<Datum>,
  configEntry?: ChartTooltipConfig<Datum>[string],
) {
  if (typeof configEntry?.color === 'function') return configEntry.color(item);
  if (configEntry?.color) return configEntry.color;

  return item.color;
}

function getVisibleItems<Datum>({
  config,
  items,
  sortItems,
}: Pick<ChartTooltipContentProps<Datum>, 'config' | 'items' | 'sortItems'>) {
  return items
    .map<VisibleItem<Datum>>((item, index) => ({
      configEntry: getConfigEntry(item, config),
      index,
      item,
    }))
    .filter(({ configEntry, item }) => !item.hidden && !configEntry?.hide)
    .sort((a, b) => {
      const aOrder = a.configEntry?.order;
      const bOrder = b.configEntry?.order;

      if (aOrder != null && bOrder != null && aOrder !== bOrder) return aOrder - bOrder;
      if (aOrder != null && bOrder == null) return -1;
      if (aOrder == null && bOrder != null) return 1;

      const sorted = sortItems?.(a.item, b.item) ?? 0;
      if (sorted !== 0) return sorted;

      return a.index - b.index;
    });
}

export default function ChartTooltipContent<Datum = unknown>({
  className,
  config,
  getItemKey = (item, index) => item.key ?? index,
  hideIndicator = false,
  hideLabel = false,
  indicator = 'dot',
  items,
  label,
  renderItem,
  renderLabel,
  renderValue,
  sortItems,
  'data-testid': dataTestId = 'chart-tooltip-content',
  ...restProps
}: ChartTooltipContentProps<Datum>) {
  const visibleItems = getVisibleItems({ config, items, sortItems });

  if (visibleItems.length === 0) return null;

  const renderedLabel =
    !hideLabel && label != null
      ? renderLabel?.({ label, items: visibleItems.map(({ item }) => item), config }) ?? label
      : null;

  return (
    <div
      {...restProps}
      className={className}
      data-visx-chart-tooltip=""
      data-testid={dataTestId}
    >
      {renderedLabel != null && (
        <div data-visx-chart-tooltip-label="">{renderedLabel}</div>
      )}
      <div data-visx-chart-tooltip-items="">
        {visibleItems.map(({ configEntry, index, item }) => {
          const itemLabel = getItemLabel(item, configEntry);
          const itemValue = getItemValue(item, configEntry);
          const itemColor = getItemColor(item, configEntry);
          const Icon = configEntry?.icon;
          const valueParams = {
            color: itemColor,
            configEntry,
            indicator,
            item,
            label: itemLabel,
            value: itemValue,
          };
          const renderedValue = renderValue?.(valueParams) ?? itemValue;
          const itemParams = {
            ...valueParams,
            value: renderedValue,
          };

          return (
            <div
              key={getItemKey(item, index)}
              data-item-key={item.key}
              data-testid={`item-${item.key}`}
              data-visx-chart-tooltip-item=""
              style={
                itemColor
                  ? ({ '--visx-tooltip-item-color': itemColor } as React.CSSProperties)
                  : undefined
              }
            >
              {renderItem ? (
                renderItem(itemParams)
              ) : (
                <>
                  {!hideIndicator && indicator !== 'none' && (
                    <span
                      aria-hidden
                      data-indicator={indicator}
                      data-visx-chart-tooltip-indicator=""
                    />
                  )}
                  {Icon && <Icon item={item} />}
                  <span data-visx-chart-tooltip-item-label="">{itemLabel}</span>
                  <span data-visx-chart-tooltip-item-value="">{renderedValue}</span>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
