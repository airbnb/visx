import { AxisScale } from '@visx/axis';
import React from 'react';
import { GlyphProps, GlyphsProps } from '../../../types';
declare type ConfigKeys = 'enter' | 'update' | 'from' | 'leave';
/** Memoized useTransition config */
export declare function useAnimatedGlyphsConfig<XScale extends AxisScale, YScale extends AxisScale, Datum extends object>({ xScale, yScale, horizontal, }: {
    xScale: XScale;
    yScale: YScale;
    horizontal?: boolean;
}): {
    [key in ConfigKeys]: (props: GlyphProps<Datum>) => React.CSSProperties;
};
export default function AnimatedGlyphs<XScale extends AxisScale, YScale extends AxisScale, Datum extends object>({ renderGlyph, glyphs, horizontal, xScale, yScale, onBlur, onFocus, onPointerMove, onPointerOut, onPointerUp, }: {
    renderGlyph: React.FC<GlyphProps<Datum>>;
} & GlyphsProps<XScale, YScale, Datum>): JSX.Element;
export {};
//# sourceMappingURL=AnimatedGlyphs.d.ts.map