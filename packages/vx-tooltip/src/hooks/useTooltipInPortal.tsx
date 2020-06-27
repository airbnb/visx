import React, { useMemo } from 'react';
import useMeasure, { RectReadOnly, Options as BaseUseMeasureOptions } from 'react-use-measure';

import Portal from '../Portal';
import Tooltip, { TooltipProps } from '../tooltips/Tooltip';
import TooltipWithBounds from '../tooltips/TooltipWithBounds';

export type UseTooltipInPortal = {
  containerRef: (element: HTMLElement | SVGElement | null) => void;
  containerBounds: RectReadOnly;
  TooltipInPortal: React.FC<TooltipProps>;
};

export type UseTooltipPortalOptions = {
  /** whether TooltipWithBounds should be used to auto-detect (page) boundaries and reposition itself. */
  detectBounds?: boolean;
  /** Debounce resize or scroll events in milliseconds (needed for positioning) */
  debounce?: number | { scroll: number; resize: number };
  /** React to nested scroll changes, don't use this if you know your view is static */
  scroll?: boolean;
  /** You can optionally inject a ResizeObserver polyfill. */
  polyfill?: BaseUseMeasureOptions['polyfill'];
};

/**
 * Hook that handles rendering of a Tooltip or TooltipWithBounds in a Portal.
 * Handles conversion of container coordinates to page coordinates using the container bounds.
 */
export default function useTooltipInPortal({
  detectBounds = true,
  ...useMeasureOptions
}: UseTooltipPortalOptions | undefined = {}): UseTooltipInPortal {
  const [containerRef, containerBounds] = useMeasure(useMeasureOptions);

  const TooltipInPortal = useMemo(
    () => ({ left: containerLeft = 0, top: containerTop = 0, ...tooltipProps }: TooltipProps) => {
      const TooltipComponent = detectBounds ? TooltipWithBounds : Tooltip;
      // convert container coordinates to page coordinates
      const portalLeft = containerLeft + (containerBounds.left || 0) + window.scrollX;
      const portalTop = containerTop + (containerBounds.top || 0) + window.scrollY;

      return (
        <Portal>
          <TooltipComponent left={portalLeft} top={portalTop} {...tooltipProps} />
        </Portal>
      );
    },
    [detectBounds, containerBounds.left, containerBounds.top],
  );

  return {
    // react-use-measure doesn't currently accept SVGElement refs
    // @ts-ignore fixed here https://github.com/react-spring/react-use-measure/pull/17
    containerRef,
    containerBounds,
    TooltipInPortal,
  };
}
