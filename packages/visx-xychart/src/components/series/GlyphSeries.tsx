import type { AxisScale } from '@visx/axis';
import React, { useCallback } from 'react';
import type { GlyphProps, GlyphsProps } from '../../types';
import type { BaseGlyphSeriesProps } from './private/BaseGlyphSeries';
import BaseGlyphSeries from './private/BaseGlyphSeries';
import defaultRenderGlyph from './private/defaultRenderGlyph';

export default function GlyphSeries<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
>({
  renderGlyph = defaultRenderGlyph,
  ...props
}: Omit<BaseGlyphSeriesProps<XScale, YScale, Datum>, 'renderGlyphs'> & {
  renderGlyph?: React.FC<GlyphProps<Datum>>;
}) {
  const renderGlyphs = useCallback(
    ({
      glyphs,
      onPointerMove,
      onPointerOut,
      onPointerUp,
      onFocus,
      onBlur,
    }: GlyphsProps<XScale, YScale, Datum>) =>
      glyphs.map((glyph) => (
        <React.Fragment key={glyph.key}>
          {renderGlyph({ ...glyph, onPointerMove, onPointerOut, onPointerUp, onFocus, onBlur })}
        </React.Fragment>
      )),
    [renderGlyph],
  );
  return <BaseGlyphSeries<XScale, YScale, Datum> {...props} renderGlyphs={renderGlyphs} />;
}
