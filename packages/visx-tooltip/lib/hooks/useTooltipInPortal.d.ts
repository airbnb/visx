import React from 'react';
import { RectReadOnly, Options as BaseUseMeasureOptions } from 'react-use-measure';
import { TooltipProps } from '../tooltips/Tooltip';
export declare type TooltipInPortalProps = TooltipProps & Pick<UseTooltipPortalOptions, 'detectBounds'>;
export declare type UseTooltipInPortal = {
    containerRef: (element: HTMLElement | SVGElement | null) => void;
    containerBounds: RectReadOnly;
    forceRefreshBounds: () => void;
    TooltipInPortal: React.FC<TooltipInPortalProps>;
};
export declare type UseTooltipPortalOptions = {
    /** whether TooltipWithBounds should be used to auto-detect (page) boundaries and reposition itself. */
    detectBounds?: boolean;
    /** Debounce resize or scroll events in milliseconds (needed for positioning) */
    debounce?: number | {
        scroll: number;
        resize: number;
    };
    /** React to nested scroll changes, don't use this if you know your view is static */
    scroll?: boolean;
    /** You can optionally inject a ResizeObserver polyfill. */
    polyfill?: BaseUseMeasureOptions['polyfill'];
};
/**
 * Hook that handles rendering of a Tooltip or TooltipWithBounds in a Portal.
 * Handles conversion of container coordinates to page coordinates using the container bounds.
 */
export default function useTooltipInPortal({ detectBounds: detectBoundsOption, ...useMeasureOptions }?: UseTooltipPortalOptions | undefined): UseTooltipInPortal;
//# sourceMappingURL=useTooltipInPortal.d.ts.map