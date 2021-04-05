import { CSSProperties } from 'react';
import { D3Scale, NumberLike } from '@visx/scale';
export declare type GridScaleOutput = number | NumberLike | undefined;
/** A catch-all type for scales that are compatible with grid */
export declare type GridScale<Output extends GridScaleOutput = GridScaleOutput> = D3Scale<Output, any, any>;
export declare type GridLines = {
    from: {
        x?: number;
        y?: number;
    };
    to: {
        x?: number;
        y?: number;
    };
}[];
export declare type CommonGridProps = {
    /** classname to apply to line group element. */
    className?: string;
    /** Optionally override rendering of grid lines. */
    children?: (props: {
        lines: GridLines;
    }) => React.ReactNode;
    /** Top offset to apply to glyph g element container. */
    top?: number;
    /** Left offset to apply to glyph g element container. */
    left?: number;
    /** Grid line stroke color. */
    stroke?: string;
    /** Grid line stroke thickness. */
    strokeWidth?: string | number;
    /** Grid line stroke-dasharray attribute. */
    strokeDasharray?: string;
    /** Approximate number of grid lines. Approximate due to d3 alogrithm, specify `tickValues` for precise control. */
    numTicks?: number;
    /** Styles to apply as grid line style. */
    lineStyle?: CSSProperties;
    /** Pixel offset to apply as a translation (y- for Rows, x- for Columns) to each grid lines. */
    offset?: number;
};
//# sourceMappingURL=types.d.ts.map