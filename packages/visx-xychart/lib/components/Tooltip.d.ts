import React from 'react';
import { TooltipProps as BaseTooltipProps } from '@visx/tooltip/lib/tooltips/Tooltip';
import { PickD3Scale } from '@visx/scale';
import { UseTooltipPortalOptions } from '@visx/tooltip/lib/hooks/useTooltipInPortal';
import { TooltipContextType } from '../types';
export declare type RenderTooltipParams<Datum extends object> = TooltipContextType<Datum> & {
    colorScale?: PickD3Scale<'ordinal', string, string>;
};
export declare type TooltipProps<Datum extends object> = {
    /**
     * When TooltipContext.tooltipOpen=true, this function is invoked and if the
     * return value is non-null, its content is rendered inside the tooltip container.
     * Content will be rendered in an HTML parent.
     */
    renderTooltip: (params: RenderTooltipParams<Datum>) => React.ReactNode;
    /** Whether to snap tooltip + crosshair x-coord to the nearest Datum x-coord instead of the event x-coord. */
    snapTooltipToDatumX?: boolean;
    /** Whether to snap tooltip + crosshair y-coord to the nearest Datum y-coord instead of the event y-coord. */
    snapTooltipToDatumY?: boolean;
    /** Whether to show a vertical line at tooltip position. */
    showVerticalCrosshair?: boolean;
    /** Whether to show a horizontal line at tooltip position. */
    showHorizontalCrosshair?: boolean;
    /** Whether to show a glyph at the tooltip position for the (single) nearest Datum. */
    showDatumGlyph?: boolean;
    /** Whether to show a glyph for the nearest Datum in each series. */
    showSeriesGlyphs?: boolean;
    /** Optional styles for the vertical crosshair, if visible. */
    verticalCrosshairStyle?: React.SVGProps<SVGLineElement>;
    /** Optional styles for the vertical crosshair, if visible. */
    horizontalCrosshairStyle?: React.SVGProps<SVGLineElement>;
    /** Optional styles for the point, if visible. */
    glyphStyle?: React.SVGProps<SVGCircleElement>;
    /**
     * Tooltip depends on ResizeObserver, which may be pollyfilled globally
     * or injected into this component.
     */
    resizeObserverPolyfill?: UseTooltipPortalOptions['polyfill'];
} & Omit<BaseTooltipProps, 'left' | 'top' | 'children'> & Pick<UseTooltipPortalOptions, 'debounce' | 'detectBounds' | 'scroll'>;
export default function Tooltip<Datum extends object>({ debounce, detectBounds, horizontalCrosshairStyle, glyphStyle, renderTooltip, resizeObserverPolyfill, scroll, showDatumGlyph, showHorizontalCrosshair, showSeriesGlyphs, showVerticalCrosshair, snapTooltipToDatumX, snapTooltipToDatumY, verticalCrosshairStyle, ...tooltipProps }: TooltipProps<Datum>): JSX.Element;
//# sourceMappingURL=Tooltip.d.ts.map