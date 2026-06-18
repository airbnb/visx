import { autoUpdate, useFloating } from '@floating-ui/react';
import type { OpenChangeReason, ReferenceElement } from '@floating-ui/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getTooltipAnchorReference } from './anchors';
import { buildFloatingTooltipMiddleware } from './middleware';
import type {
  FloatingTooltipOpenChangeDetails,
  TooltipAlign,
  TooltipAnchor,
  TooltipSide,
  UseFloatingTooltipOptions,
  UseFloatingTooltipReturn,
} from './types';

function getSideAndAlign(placement: string): { side: TooltipSide; align: TooltipAlign } {
  const [side, align = 'center'] = placement.split('-');

  return {
    side: side as TooltipSide,
    align: align as TooltipAlign,
  };
}

export default function useFloatingTooltip<TData = unknown>({
  anchor: anchorProp,
  arrow = false,
  collisionBoundary,
  collisionPadding,
  data: dataProp,
  defaultAnchor = null,
  defaultData,
  defaultOpen = false,
  disabled = false,
  flip = true,
  hideWhenDetached = false,
  middleware,
  middlewareMode = 'append',
  offset = 0,
  onOpenChange,
  open: openProp,
  placement = 'top',
  shift = true,
  size = false,
  strategy = 'absolute',
  whileElementsMounted = autoUpdate,
}: UseFloatingTooltipOptions<TData> = {}): UseFloatingTooltipReturn<TData> {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [uncontrolledAnchor, setUncontrolledAnchor] = useState<TooltipAnchor | null>(defaultAnchor);
  const [uncontrolledData, setUncontrolledData] = useState<TData | undefined>(defaultData);
  const [arrowElement, setArrowElement] = useState<SVGSVGElement | null>(null);

  const isOpenControlled = openProp != null;
  const isAnchorControlled = anchorProp !== undefined;
  const isDataControlled = dataProp !== undefined;

  const open = disabled ? false : isOpenControlled ? Boolean(openProp) : uncontrolledOpen;
  const anchor = isAnchorControlled ? anchorProp ?? null : uncontrolledAnchor;
  const data = isDataControlled ? dataProp : uncontrolledData;

  const builtMiddleware = useMemo(
    () =>
      buildFloatingTooltipMiddleware({
        arrow,
        arrowElement,
        collisionBoundary,
        collisionPadding,
        flip,
        hideWhenDetached,
        middleware,
        middlewareMode,
        offset,
        shift,
        size,
      }),
    [
      arrow,
      arrowElement,
      collisionBoundary,
      collisionPadding,
      flip,
      hideWhenDetached,
      middleware,
      middlewareMode,
      offset,
      shift,
      size,
    ],
  );

  const handleOpenChange = useCallback(
    (
      nextOpen: boolean,
      event?: Event,
      reason?: OpenChangeReason,
      details?: Partial<FloatingTooltipOpenChangeDetails<TData>>,
    ) => {
      if (disabled) return;
      if (!isOpenControlled) setUncontrolledOpen(nextOpen);

      onOpenChange?.(nextOpen, {
        data,
        anchor,
        ...details,
        event,
        reason,
      });
    },
    [anchor, data, disabled, isOpenControlled, onOpenChange],
  );

  const floating = useFloating<ReferenceElement>({
    middleware: builtMiddleware,
    onOpenChange: (nextOpen, event, reason) => handleOpenChange(nextOpen, event, reason),
    open,
    placement,
    strategy,
    whileElementsMounted,
  });

  const positionReference = useMemo(() => getTooltipAnchorReference(anchor), [anchor]);

  useEffect(() => {
    floating.refs.setPositionReference(positionReference);
  }, [floating.refs, positionReference]);

  const setAnchor = useCallback(
    (nextAnchor: TooltipAnchor | null) => {
      if (!isAnchorControlled) setUncontrolledAnchor(nextAnchor);
    },
    [isAnchorControlled],
  );

  const setData = useCallback(
    (nextData: TData | undefined) => {
      if (!isDataControlled) setUncontrolledData(nextData);
    },
    [isDataControlled],
  );

  const openTooltip = useCallback(
    (nextData?: TData, nextAnchor?: TooltipAnchor | null) => {
      const resolvedData = nextData === undefined ? data : nextData;
      const resolvedAnchor = nextAnchor === undefined ? anchor : nextAnchor;

      if (nextData !== undefined && !isDataControlled) setUncontrolledData(nextData);
      if (nextAnchor !== undefined && !isAnchorControlled) setUncontrolledAnchor(nextAnchor);

      handleOpenChange(true, undefined, undefined, {
        data: resolvedData,
        anchor: resolvedAnchor,
      });
    },
    [anchor, data, handleOpenChange, isAnchorControlled, isDataControlled],
  );

  const closeTooltip = useCallback(() => {
    handleOpenChange(false);
  }, [handleOpenChange]);

  const { align, side } = getSideAndAlign(floating.placement);

  return {
    open,
    mounted: open,
    data,
    anchor,
    placement: floating.placement,
    side,
    align,
    strategy,
    x: floating.x,
    y: floating.y,
    floatingStyles: floating.floatingStyles,
    middlewareData: floating.middlewareData,
    refs: floating.refs,
    context: floating.context,
    arrowRef: setArrowElement,
    setAnchor,
    setData,
    update: floating.update,
    openTooltip,
    closeTooltip,
    getReferenceProps: (props) => props ?? ({} as never),
    getFloatingProps: (props) => props ?? ({} as never),
    getArrowProps: (props) => props ?? ({} as never),
  };
}
