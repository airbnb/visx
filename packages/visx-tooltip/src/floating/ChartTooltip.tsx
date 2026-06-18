import React from 'react';
import ChartTooltipContent from './ChartTooltipContent';
import FloatingTooltip from './FloatingTooltip';
import type {
  ChartTooltipConfig,
  ChartTooltipContentProps,
  ChartTooltipItem,
} from './ChartTooltipContent';
import type {
  FloatingTooltipOffset,
  FloatingTooltipPadding,
  FloatingTooltipPortalProps,
  FloatingTooltipPositionerProps,
  FloatingTooltipRootState,
  TooltipAnchor,
  TooltipPlacement,
  UseFloatingTooltipOptions,
} from './types';

export type { ChartTooltipItem } from './ChartTooltipContent';

export type ChartTooltipControlledProps<Datum = unknown> = {
  open: boolean;
  anchor: TooltipAnchor | null;
  items: ChartTooltipItem<Datum>[];
};

export type ChartTooltipProps<Datum = unknown> = ChartTooltipControlledProps<Datum> & {
  config?: ChartTooltipConfig<Datum>;
  label?: React.ReactNode;

  placement?: TooltipPlacement;
  strategy?: 'absolute' | 'fixed';
  offset?: number | FloatingTooltipOffset;
  collisionPadding?: FloatingTooltipPadding;
  portal?: boolean;
  portalProps?: Omit<FloatingTooltipPortalProps, 'children'>;
  positionerProps?: Omit<FloatingTooltipPositionerProps, 'children'>;
  contentProps?: Omit<ChartTooltipContentProps<Datum>, 'items' | 'config' | 'label'>;
  floatingOptions?: Omit<
    UseFloatingTooltipOptions<ChartTooltipItem<Datum>[]>,
    'open' | 'defaultOpen' | 'data' | 'defaultData' | 'anchor' | 'defaultAnchor'
  >;

  renderContent?: (params: {
    items: ChartTooltipItem<Datum>[];
    config?: ChartTooltipConfig<Datum>;
    state: FloatingTooltipRootState<ChartTooltipItem<Datum>[]>;
  }) => React.ReactNode;
};

export default function ChartTooltip<Datum = unknown>({
  anchor,
  collisionPadding,
  config,
  contentProps,
  floatingOptions,
  items,
  label,
  offset = 8,
  open,
  placement = 'top',
  portal = true,
  portalProps,
  positionerProps,
  renderContent,
  strategy,
}: ChartTooltipProps<Datum>) {
  return (
    <FloatingTooltip.Root
      {...floatingOptions}
      open={open}
      anchor={anchor}
      data={items}
      placement={placement}
      strategy={strategy}
      offset={offset}
      collisionPadding={collisionPadding}
    >
      {(state) => {
        const content = renderContent?.({ items, config, state }) ?? (
          <ChartTooltipContent label={label} items={items} config={config} {...contentProps} />
        );

        if (!content) return null;

        const body = (
          <FloatingTooltip.Positioner {...positionerProps}>
            <FloatingTooltip.Content>{content}</FloatingTooltip.Content>
          </FloatingTooltip.Positioner>
        );

        return portal ? (
          <FloatingTooltip.Portal {...portalProps}>{body}</FloatingTooltip.Portal>
        ) : (
          body
        );
      }}
    </FloatingTooltip.Root>
  );
}
