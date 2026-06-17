'use client';

import type { CSSProperties, ReactNode } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  getChartConfigColor,
  getChartConfigIcon,
  getChartConfigLabel,
  type ChartConfig,
  type ChartConfigItem,
} from '@visx/chart';

export type ChartLegendItem = {
  key: string;
  label?: ReactNode;
  color?: string;
  icon?: ChartConfigItem['icon'];
};

export type ChartLegendProps = {
  'aria-label'?: string;
  className?: string;
  config?: ChartConfig;
  items?: ChartLegendItem[];
  series?: string[];
  style?: CSSProperties;
};

export type ChartTooltipIndicator = 'dot' | 'line' | 'dashed';

export type ChartTooltipItem = ChartLegendItem & {
  value?: ReactNode;
};

export type ChartTooltipBounds = {
  width: number;
  height: number;
  padding?: number;
};

export type ChartTooltipProps = {
  active?: boolean;
  bounds?: ChartTooltipBounds;
  className?: string;
  config?: ChartConfig;
  formatValue?: (item: ChartTooltipItem) => ReactNode;
  hideIndicator?: boolean;
  hideLabel?: boolean;
  indicator?: ChartTooltipIndicator;
  items?: ChartTooltipItem[];
  label?: ReactNode;
  offset?: number;
  style?: CSSProperties;
  x?: number;
  y?: number;
};

function getConfigSeries(config: ChartConfig | undefined) {
  return Object.keys(config ?? {});
}

function getLegendItems({
  config,
  items,
  series,
}: Pick<ChartLegendProps, 'config' | 'items' | 'series'>) {
  const baseItems: ChartLegendItem[] =
    items ??
    (series ?? getConfigSeries(config)).map((key) => ({
      key,
    }));

  return baseItems.map((item) => ({
    ...item,
    color: item.color ?? getChartConfigColor(config, item.key),
    icon: item.icon ?? getChartConfigIcon(config, item.key),
    label: item.label ?? getChartConfigLabel(config, item.key),
  }));
}

function ChartIndicator({
  color,
  indicator,
}: {
  color?: string;
  indicator: ChartTooltipIndicator;
}) {
  const resolvedColor = color ?? 'currentColor';

  if (indicator === 'line' || indicator === 'dashed') {
    return (
      <span
        aria-hidden="true"
        style={{
          width: 14,
          borderTop: `2px ${indicator === 'dashed' ? 'dashed' : 'solid'} ${resolvedColor}`,
        }}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      style={{
        width: 8,
        height: 8,
        borderRadius: 999,
        background: resolvedColor,
      }}
    />
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function ChartLegend({
  'aria-label': ariaLabel = 'Chart legend',
  className,
  config,
  items,
  series,
  style,
}: ChartLegendProps) {
  const legendItems = getLegendItems({ config, items, series });

  if (legendItems.length === 0) {
    return null;
  }

  return (
    <div
      aria-label={ariaLabel}
      className={className}
      role="list"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        boxSizing: 'border-box',
        gap: '10px 14px',
        color: 'var(--muted-foreground, currentColor)',
        fontSize: 12,
        lineHeight: 1,
        ...style,
      }}
    >
      {legendItems.map(({ color, icon: Icon, key, label }) => (
        <div
          key={key}
          role="listitem"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            minWidth: 0,
          }}
        >
          {Icon ? (
            <span aria-hidden="true" style={{ color }}>
              <Icon className="visx-chart-legend-icon" />
            </span>
          ) : (
            <ChartIndicator color={color} indicator="dot" />
          )}
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

export function ChartTooltip({
  active,
  bounds,
  className,
  config,
  formatValue,
  hideIndicator = false,
  hideLabel = false,
  indicator = 'dot',
  items = [],
  label,
  offset = 10,
  style,
  x,
  y,
}: ChartTooltipProps) {
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [tooltipSize, setTooltipSize] = useState({ width: 0, height: 0 });
  const tooltipItems = getLegendItems({ config, items }).map((item) => ({
    ...item,
    value: items.find(({ key }) => key === item.key)?.value,
  }));
  const position = useMemo(() => {
    const padding = bounds?.padding ?? 8;
    const tooltipWidth = tooltipSize.width || 144;
    const tooltipHeight = tooltipSize.height || 48;
    const minX = padding + tooltipWidth / 2;
    const maxX = bounds ? Math.max(minX, bounds.width - padding - tooltipWidth / 2) : minX;
    const clampedX = bounds && x != null ? clamp(x, minX, maxX) : x;
    const shouldPlaceBelow = bounds && y != null && y - tooltipHeight - offset < padding;
    const top = shouldPlaceBelow && y != null ? y + offset : y;

    return {
      left: clampedX,
      top,
      transform: shouldPlaceBelow
        ? 'translate(-50%, 0)'
        : `translate(-50%, calc(-100% - ${offset}px))`,
    };
  }, [bounds, offset, tooltipSize.height, tooltipSize.width, x, y]);

  useEffect(() => {
    if (!active) {
      return;
    }

    const rect = tooltipRef.current?.getBoundingClientRect();

    if (!rect) {
      return;
    }

    setTooltipSize((currentSize) =>
      currentSize.width === rect.width && currentSize.height === rect.height
        ? currentSize
        : { width: rect.width, height: rect.height },
    );
  }, [active, items, label, tooltipItems.length]);

  if (!active || x == null || y == null || tooltipItems.length === 0) {
    return null;
  }

  return (
    <div
      ref={tooltipRef}
      className={className}
      role="tooltip"
      style={{
        position: 'absolute',
        left: position.left,
        top: position.top,
        zIndex: 10,
        minWidth: 144,
        maxWidth: bounds ? `calc(${bounds.width}px - ${(bounds.padding ?? 8) * 2}px)` : 240,
        transform: position.transform,
        pointerEvents: 'none',
        border: '1px solid var(--border, rgb(229, 231, 235))',
        borderRadius: 8,
        background: 'var(--popover, var(--card, white))',
        color: 'var(--popover-foreground, var(--foreground, black))',
        boxShadow: '0 8px 24px rgb(0 0 0 / 12%)',
        padding: 10,
        fontSize: 12,
        lineHeight: 1.2,
        overflowWrap: 'break-word',
        ...style,
      }}
    >
      {!hideLabel && label != null && (
        <div
          style={{
            marginBottom: 8,
            fontWeight: 600,
          }}
        >
          {label}
        </div>
      )}
      <div style={{ display: 'grid', gap: 6 }}>
        {tooltipItems.map((item) => {
          const value = formatValue ? formatValue(item) : item.value;
          const Icon = item.icon;

          return (
            <div
              key={item.key}
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto minmax(0, 1fr) auto',
                alignItems: 'center',
                gap: 8,
              }}
            >
              {!hideIndicator && (
                <span
                  aria-hidden="true"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: item.color,
                  }}
                >
                  {Icon ? <Icon className="visx-chart-tooltip-icon" /> : null}
                  {!Icon && <ChartIndicator color={item.color} indicator={indicator} />}
                </span>
              )}
              <span
                style={{
                  color: 'var(--muted-foreground, currentColor)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.label}
              </span>
              <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>{value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
