import {
  autoUpdate,
  useDelayGroup,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import type { OpenChangeReason, ReferenceElement } from '@floating-ui/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type React from 'react';
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

function getFloatingPropsWithDefaultId<TProps extends React.HTMLProps<HTMLElement>>(
  props: TProps | undefined,
  id: string | undefined,
) {
  let nextProps = props;

  if (
    nextProps &&
    nextProps.id === undefined &&
    Object.prototype.hasOwnProperty.call(nextProps, 'id')
  ) {
    const { id: _id, ...restProps } = nextProps;
    nextProps = restProps as TProps;
  }

  if (id != null && nextProps?.id == null) {
    const propsWithId = { ...nextProps, id };
    return propsWithId as TProps;
  }

  return nextProps;
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
  id,
  interactions = true,
  middleware,
  middlewareMode = 'append',
  offset = 0,
  onOpenChange,
  open: openProp,
  placement = 'top',
  role = 'tooltip',
  shift = true,
  size = false,
  strategy = 'absolute',
  whileElementsMounted = autoUpdate,
}: UseFloatingTooltipOptions<TData> = {}): UseFloatingTooltipReturn<TData> {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [uncontrolledAnchor, setUncontrolledAnchor] = useState<TooltipAnchor | null>(defaultAnchor);
  const [uncontrolledData, setUncontrolledData] = useState<TData | undefined>(defaultData);
  const [arrowElement, setArrowElement] = useState<SVGSVGElement | null>(null);
  const [domReference, setDomReference] = useState<ReferenceElement | null>(null);
  const [fallbackPositionReference, setFallbackPositionReference] =
    useState<ReferenceElement | null>(null);
  const hasManagedPositionReferenceRef = useRef(false);

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

  const interactionOptions = typeof interactions === 'object' ? interactions : {};
  const interactionsEnabled = interactions !== false && !disabled;
  const hoverOptions = interactionOptions.hover;
  const focusOptions = interactionOptions.focus;
  const dismissOptions = interactionOptions.dismiss;
  const roleOptions = interactionOptions.role;

  const hoverEnabled = interactionsEnabled && hoverOptions !== false;
  const focusEnabled = interactionsEnabled && focusOptions !== false;
  const dismissEnabled = interactionsEnabled && dismissOptions !== false;
  const roleEnabled = interactionsEnabled && roleOptions !== false;
  const delayGroup = useDelayGroup(floating.context, { enabled: hoverEnabled });

  const hoverProps = useHover(floating.context, {
    delay: delayGroup.delay,
    enabled: hoverEnabled,
    ...(typeof hoverOptions === 'object' ? hoverOptions : null),
  });
  const focusProps = useFocus(floating.context, {
    enabled: focusEnabled,
    ...(typeof focusOptions === 'object' ? focusOptions : null),
  });
  const dismissProps = useDismiss(floating.context, {
    enabled: dismissEnabled,
    ...(typeof dismissOptions === 'object' ? dismissOptions : null),
  });
  const roleProps = useRole(floating.context, {
    enabled: roleEnabled,
    role,
    ...(typeof roleOptions === 'object' ? roleOptions : null),
  });
  const { getFloatingProps, getReferenceProps } = useInteractions([
    hoverProps,
    focusProps,
    dismissProps,
    roleProps,
  ]);

  const explicitPositionReference = useMemo(() => getTooltipAnchorReference(anchor), [anchor]);
  const fallbackReference = fallbackPositionReference ?? domReference;
  const positionReference = anchor == null ? fallbackReference : explicitPositionReference;
  const hasManagedPositionReference = anchor != null || fallbackReference != null;

  useEffect(() => {
    if (hasManagedPositionReference || hasManagedPositionReferenceRef.current) {
      floating.refs.setPositionReference(positionReference);
      hasManagedPositionReferenceRef.current = hasManagedPositionReference;
    }
  }, [floating.refs, hasManagedPositionReference, positionReference]);

  const setReference = useCallback(
    (nextReference: ReferenceElement | null) => {
      setDomReference(nextReference);
      floating.refs.setReference(nextReference);
    },
    [floating.refs],
  );

  const setPositionReference = useCallback(
    (nextReference: ReferenceElement | null) => {
      setFallbackPositionReference(nextReference);
      floating.refs.setPositionReference(nextReference);
    },
    [floating.refs],
  );

  const refs = useMemo(
    () => ({
      ...floating.refs,
      setReference,
      setPositionReference,
    }),
    [floating.refs, setPositionReference, setReference],
  );

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
  const getFloatingPropsWithId = useCallback(
    <TProps extends React.HTMLProps<HTMLElement>>(props?: TProps) =>
      getFloatingProps(getFloatingPropsWithDefaultId(props, id)) as TProps,
    [getFloatingProps, id],
  );

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
    refs,
    context: floating.context,
    arrowRef: setArrowElement,
    setAnchor,
    setData,
    update: floating.update,
    openTooltip,
    closeTooltip,
    getReferenceProps: <TProps extends React.HTMLProps<Element>>(props?: TProps) =>
      getReferenceProps(props) as TProps,
    getFloatingProps: getFloatingPropsWithId,
    getArrowProps: <TProps extends React.SVGProps<SVGSVGElement>>(props?: TProps) => {
      const emptyProps = {};
      return props ?? (emptyProps as TProps);
    },
  };
}
