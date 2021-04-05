import React from 'react';
import { Symbol } from 'd3-shape';
export declare type GlyphCrossProps<Datum> = {
    /** Render function override which is passed the configured path generator. */
    children?: ({ path }: {
        path: Symbol<any, Datum>;
    }) => React.ReactNode;
    /** classname to apply to glyph path element. */
    className?: string;
    /** Top offset to apply to glyph g element container. */
    top?: number;
    /** Left offset to apply to glyph g element container. */
    left?: number;
    /** Size of cross in px, or an accessor which takes Datum as input and returns a size. */
    size?: number | ((d: Datum) => number);
};
export default function GlyphCross<Datum = any>({ children, className, top, left, size, ...restProps }: GlyphCrossProps<Datum> & Omit<React.SVGProps<SVGPathElement>, keyof GlyphCrossProps<Datum>>): JSX.Element;
//# sourceMappingURL=GlyphCross.d.ts.map