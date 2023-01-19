import React, { useCallback, useMemo, useState } from 'react';
import useMeasure, { RectReadOnly, Options as BaseUseMeasureOptions } from 'react-use-measure';
import useResizeObserver from '@react-hook/resize-observer';

import Portal, { PortalProps } from '../Portal';
import Tooltip, { TooltipProps } from '../tooltips/Tooltip';
import TooltipWithBounds from '../tooltips/TooltipWithBounds';

export type TooltipInPortalProps = TooltipProps &
  Pick<UseTooltipPortalOptions, 'detectBounds' | 'portalContainer' | 'zIndex'>;

export type UseTooltipInPortal = {
  containerRef: (element: HTMLElement | SVGElement | null) => void;
  containerBounds: RectReadOnly;
  forceRefreshBounds: () => void;
  TooltipInPortal: React.FC<TooltipInPortalProps>;
};

export type UseTooltipPortalOptions = Pick<PortalProps, 'zIndex'> & {
  /** whether TooltipWithBounds should be used to auto-detect (page) boundaries and reposition itself. */
  detectBounds?: boolean;
  /** Debounce resize or scroll events in milliseconds (needed for positioning) */
  debounce?: number | { scroll: number; resize: number };
  /** React to nested scroll changes, don't use this if you know your view is static */
  scroll?: boolean;
  /** You can optionally inject a ResizeObserver polyfill. */
  polyfill?: BaseUseMeasureOptions['polyfill'];
  /** Optional container for the portal. */
  portalContainer?: HTMLDivElement;
};

/**
 * Hook that handles rendering of a Tooltip or TooltipWithBounds in a Portal.
 * Handles conversion of container coordinates to page coordinates using the container bounds.
 */
export default function useTooltipInPortal({
  detectBounds: detectBoundsOption = true,
  portalContainer,
  zIndex: zIndexOption,
  ...useMeasureOptions
}: UseTooltipPortalOptions | undefined = {}): UseTooltipInPortal {
  const [containerRef, containerBounds, forceRefreshBounds] = useMeasure(useMeasureOptions);

  const [portalContainerRect, setPortalContainerRect] = useState<DOMRect | null>(
    portalContainer?.getBoundingClientRect() ?? null,
  );

  const updatePortalContainerRect = useCallback(() => {
    if (portalContainer) {
      setPortalContainerRect(portalContainer?.getBoundingClientRect());
    }
  }, [portalContainer]);

  React.useEffect(updatePortalContainerRect, [
    containerBounds,
    portalContainer,
    updatePortalContainerRect,
  ]);
  useResizeObserver(portalContainer ?? null, updatePortalContainerRect);

  const TooltipInPortal = useMemo(
    () =>
      function ({
        left: tooltipLeft = 0,
        top: tooltipTop = 0,
        detectBounds: detectBoundsProp, // allow override at component-level
        zIndex: zIndexProp, // allow override at the component-level
        ...tooltipProps
      }: TooltipInPortalProps) {
        const detectBounds = detectBoundsProp == null ? detectBoundsOption : detectBoundsProp;
        const zIndex = zIndexProp == null ? zIndexOption : zIndexProp;
        const TooltipComponent = detectBounds ? TooltipWithBounds : Tooltip;
        // convert container coordinates to page coordinates
        const portalLeft = portalContainer
          ? tooltipLeft - (portalContainerRect?.left || 0) + (containerBounds.left || 0)
          : tooltipLeft + (containerBounds.left || 0) + window.scrollX;
        const portalTop = portalContainer
          ? tooltipTop - (portalContainerRect?.top || 0) + (containerBounds.top || 0)
          : tooltipTop + (containerBounds.top || 0) + window.scrollY;

        const additionalTooltipProps =
          detectBounds && portalContainer
            ? {
                portalContainerPosition: {
                  left: portalContainerRect?.left || 0,
                  top: portalContainerRect?.top || 0,
                },
                visualParentRect: {
                  width: containerBounds.width,
                  height: containerBounds.height,
                  left: containerBounds.left,
                  top: containerBounds.top,
                },
              }
            : {};

        return (
          <Portal container={portalContainer} zIndex={zIndex}>
            <TooltipComponent
              left={portalLeft}
              top={portalTop}
              {...tooltipProps}
              {...additionalTooltipProps}
            />
          </Portal>
        );
      },
    [containerBounds, detectBoundsOption, portalContainer, portalContainerRect, zIndexOption],
  );

  return {
    containerRef,
    containerBounds,
    forceRefreshBounds,
    TooltipInPortal,
  };
}
