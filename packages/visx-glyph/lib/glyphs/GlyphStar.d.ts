import React from 'react';
import { Symbol } from 'd3-shape';
export declare type GlyphStarProps<Datum> = {
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
    /** Size of star in px, or an accessor which takes Datum as input and returns a size. */
    size?: number | ((d: Datum) => number);
};
export default function GlyphStar<Datum = any>({ children, className, top, left, size, ...restProps }: GlyphStarProps<Datum> & Omit<React.SVGProps<SVGPathElement>, keyof GlyphStarProps<Datum>>): JSX.Element;
//# sourceMappingURL=GlyphStar.d.ts.map