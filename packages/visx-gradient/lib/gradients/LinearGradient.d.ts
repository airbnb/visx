import React from 'react';
declare type LinearGradientOwnProps = {
    /** Unique id for the gradient. Should be unique across all page elements. */
    id: string;
    /** Start color of gradient. */
    from?: string;
    /** End color of gradient. */
    to?: string;
    /** The x coordinate of the starting point along which the linear gradient is drawn. */
    x1?: string | number;
    /** The x coordinate of the ending point along which the linear gradient is drawn. */
    x2?: string | number;
    /** The y coordinate of the starting point along which the linear gradient is drawn. */
    y1?: string | number;
    /** The y coordinate of the ending point along which the linear gradient is drawn. */
    y2?: string | number;
    /** Number or percent defining the where the 'from' starting color is placed along the gradient. */
    fromOffset?: string | number;
    /** Opacity of the 'from' starting color. */
    fromOpacity?: string | number;
    /** Number or percent defining the where the 'to' ending color is placed along the gradient. */
    toOffset?: string | number;
    /** Opacity of the 'to' ending color. */
    toOpacity?: string | number;
    /** Rotation to apply to gradient. */
    rotate?: string | number;
    /** Transform to apply to linearGradient, overrides rotate. */
    transform?: string;
    /** Override of linearGradient children. */
    children?: React.ReactNode;
    /** (When no x or y values are passed), will orient the gradient vertically instead of horizontally. */
    vertical?: boolean;
};
export declare type LinearGradientProps = LinearGradientOwnProps & Omit<React.SVGProps<SVGLinearGradientElement>, keyof LinearGradientOwnProps>;
export default function LinearGradient({ children, id, from, to, x1: _x1, y1: _y1, x2: _x2, y2: _y2, fromOffset, fromOpacity, toOffset, toOpacity, rotate, transform, vertical, ...restProps }: LinearGradientProps): JSX.Element;
export {};
//# sourceMappingURL=LinearGradient.d.ts.map