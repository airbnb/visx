import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type React from 'react';
import type {
  ChartTooltipItem,
  ChartTooltipProps,
  ChartTooltipControlledProps,
} from './ChartTooltip';
import type {
  FloatingTooltipOffset,
  TooltipAnchor,
  TooltipPlacement,
  UseFloatingTooltipOptions,
} from './types';

export type ChartTooltipLocalPoint = {
  x: number;
  y: number;
};

export type ChartTooltipSvgPoint = {
  type: 'svg-point';
  x: number;
  y: number;
};

export type UseChartTooltipOptions<Datum = unknown> = {
  defaultOpen?: boolean;
  defaultItems?: ChartTooltipItem<Datum>[];
  defaultAnchor?: TooltipAnchor | null;
  placement?: TooltipPlacement;
  offset?: number | FloatingTooltipOffset;
  hideDelay?: number;
  container?: Element | null;
  floatingOptions?: Omit<
    UseFloatingTooltipOptions<ChartTooltipItem<Datum>[]>,
    'open' | 'defaultOpen' | 'data' | 'defaultData' | 'anchor' | 'defaultAnchor'
  >;
};

export type UseChartTooltipReturn<Datum = unknown> = {
  open: boolean;
  items: ChartTooltipItem<Datum>[];
  anchor: TooltipAnchor | null;
  containerRef: React.RefCallback<HTMLElement | SVGElement>;
  show: (args: {
    anchor: TooltipAnchor | ChartTooltipLocalPoint | ChartTooltipSvgPoint;
    items: ChartTooltipItem<Datum>[];
  }) => void;
  hide: () => void;
  update: (args: Partial<{ anchor: TooltipAnchor; items: ChartTooltipItem<Datum>[] }>) => void;
  tooltipProps: ChartTooltipControlledProps<Datum> &
    Pick<ChartTooltipProps<Datum>, 'floatingOptions' | 'offset' | 'placement'>;
};

function isTooltipAnchor(anchor: TooltipAnchor | ChartTooltipLocalPoint | ChartTooltipSvgPoint) {
  return 'type' in anchor && (anchor.type !== 'svg-point' || 'svg' in anchor);
}

function isSvgElement(element: Element | null): element is SVGSVGElement | SVGGraphicsElement {
  return Boolean(element && element.namespaceURI === 'http://www.w3.org/2000/svg');
}

export default function useChartTooltip<Datum = unknown>({
  container,
  defaultAnchor = null,
  defaultItems = [],
  defaultOpen = false,
  floatingOptions,
  hideDelay,
  offset,
  placement,
}: UseChartTooltipOptions<Datum> = {}): UseChartTooltipReturn<Datum> {
  const [open, setOpen] = useState(defaultOpen);
  const [items, setItems] = useState(defaultItems);
  const [anchor, setAnchor] = useState<TooltipAnchor | null>(defaultAnchor);
  const [containerElement, setContainerElement] = useState<HTMLElement | SVGElement | null>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const latestContainer = container ?? containerElement;

  const clearHideTimeout = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  }, []);

  useEffect(() => clearHideTimeout, [clearHideTimeout]);

  const containerRef = useCallback((node: HTMLElement | SVGElement | null) => {
    setContainerElement(node);
  }, []);

  const resolveAnchor = useCallback(
    (nextAnchor: TooltipAnchor | ChartTooltipLocalPoint | ChartTooltipSvgPoint): TooltipAnchor => {
      if (isTooltipAnchor(nextAnchor)) return nextAnchor as TooltipAnchor;

      if ('type' in nextAnchor && nextAnchor.type === 'svg-point') {
        return {
          type: 'svg-point',
          x: nextAnchor.x,
          y: nextAnchor.y,
          svg: isSvgElement(latestContainer) ? latestContainer : null,
        };
      }

      return {
        type: 'container-point',
        x: nextAnchor.x,
        y: nextAnchor.y,
        container: latestContainer,
      };
    },
    [latestContainer],
  );

  const show = useCallback(
    ({
      anchor: nextAnchor,
      items: nextItems,
    }: {
      anchor: TooltipAnchor | ChartTooltipLocalPoint | ChartTooltipSvgPoint;
      items: ChartTooltipItem<Datum>[];
    }) => {
      clearHideTimeout();
      setAnchor(resolveAnchor(nextAnchor));
      setItems(nextItems);
      setOpen(true);
    },
    [clearHideTimeout, resolveAnchor],
  );

  const hide = useCallback(() => {
    clearHideTimeout();

    if (hideDelay == null) {
      setOpen(false);
      return;
    }

    hideTimeoutRef.current = setTimeout(() => {
      setOpen(false);
      hideTimeoutRef.current = null;
    }, hideDelay);
  }, [clearHideTimeout, hideDelay]);

  const update = useCallback(
    ({
      anchor: nextAnchor,
      items: nextItems,
    }: Partial<{ anchor: TooltipAnchor; items: ChartTooltipItem<Datum>[] }>) => {
      if (nextAnchor !== undefined) setAnchor(nextAnchor);
      if (nextItems !== undefined) setItems(nextItems);
    },
    [],
  );

  const tooltipProps = useMemo(
    () => ({
      open,
      anchor,
      items,
      floatingOptions,
      offset,
      placement,
    }),
    [anchor, floatingOptions, items, offset, open, placement],
  );

  return {
    open,
    items,
    anchor,
    containerRef,
    show,
    hide,
    update,
    tooltipProps,
  };
}
