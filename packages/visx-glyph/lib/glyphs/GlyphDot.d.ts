import React from 'react';
export declare type GlyphDotProps = {
    /** classname to apply to glyph path element. */
    className?: string;
    /** Top offset to apply to glyph g element container. */
    top?: number;
    /** Left offset to apply to glyph g element container. */
    left?: number;
    /** Radius of dot. */
    r?: number;
    /** x coordinate of the center of the dot. */
    cx?: number;
    /** y coordinate of the center of the dot. */
    cy?: number;
};
export default function GlyphDot({ top, left, className, ...restProps }: GlyphDotProps & Omit<React.SVGProps<SVGCircleElement>, keyof GlyphDotProps>): JSX.Element;
//# sourceMappingURL=GlyphDot.d.ts.map