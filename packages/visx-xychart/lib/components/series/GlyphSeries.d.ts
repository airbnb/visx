import { AxisScale } from '@visx/axis';
import React from 'react';
import { GlyphProps } from '../../types';
import { BaseGlyphSeriesProps } from './private/BaseGlyphSeries';
export default function GlyphSeries<XScale extends AxisScale, YScale extends AxisScale, Datum extends object>({ renderGlyph, ...props }: Omit<BaseGlyphSeriesProps<XScale, YScale, Datum>, 'renderGlyphs'> & {
    renderGlyph?: React.FC<GlyphProps<Datum>>;
}): JSX.Element;
//# sourceMappingURL=GlyphSeries.d.ts.map