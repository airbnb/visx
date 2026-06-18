'use client';

export { getTooltipAnchorReference } from './anchors';
export { default as FloatingTooltip } from './FloatingTooltip';
export { default as useFloatingTooltip } from './useFloatingTooltip';
export { buildFloatingTooltipMiddleware } from './middleware';

export type {
  FloatingTooltipArrowOptions,
  FloatingTooltipArrowProps,
  FloatingTooltipArrowState,
  FloatingTooltipBoundary,
  FloatingTooltipContentProps,
  FloatingTooltipContentState,
  FloatingTooltipFlipOptions,
  FloatingTooltipHideOptions,
  FloatingTooltipInteractions,
  FloatingTooltipOffset,
  FloatingTooltipOpenChangeDetails,
  FloatingTooltipPadding,
  FloatingTooltipPortalProps,
  FloatingTooltipPositionerProps,
  FloatingTooltipPositionerState,
  FloatingTooltipProviderProps,
  FloatingTooltipRootProps,
  FloatingTooltipRootState,
  FloatingTooltipShiftOptions,
  FloatingTooltipSizeOptions,
  FloatingTooltipTriggerProps,
  FloatingTooltipTriggerState,
  TooltipAlign,
  TooltipAnchor,
  TooltipCoordinateSpace,
  TooltipPlacement,
  TooltipSide,
  TooltipVirtualElement,
  UseFloatingTooltipOptions,
  UseFloatingTooltipReturn,
} from './types';
