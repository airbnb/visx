import React from 'react';
export declare type TooltipProps = {
    /** Tooltip content. */
    children?: React.ReactNode;
    /** Optional className to apply to the Tooltip in addition to `visx-tooltip`. */
    className?: string;
    /** The `left` position of the Tooltip. */
    left?: number;
    /** Offset the `left` position of the Tooltip by this margin. */
    offsetLeft?: number;
    /** Offset the `top` position of the Tooltip by this margin. */
    offsetTop?: number;
    /** Styles to apply, unless `unstyled=true`. */
    style?: React.CSSProperties;
    /** The `top` position of the Tooltip. */
    top?: number;
    /**
     * Applies position: 'absolute' for tooltips to correctly position themselves
     * when `unstyled=true`. In a future major release this will be the default behavior.
     */
    applyPositionStyle?: boolean;
    /**
     * Whether to omit applying any style, except `left` / `top`.
     * In most cases if this is `true` a developer must do one of the following
     * for positioning to work correctly:
     * - set `applyPositionStyle=true`
     * - create a CSS selector like: `.visx-tooltip { position: 'absolute' }`
     */
    unstyled?: boolean;
};
export declare const defaultStyles: React.CSSProperties;
export default function Tooltip({ className, top, left, offsetLeft, offsetTop, style, children, unstyled, applyPositionStyle, ...restProps }: TooltipProps & React.HTMLProps<HTMLDivElement>): JSX.Element;
//# sourceMappingURL=Tooltip.d.ts.map