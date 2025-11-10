import type { AxisScale } from '@visx/axis';
import { useCallback } from 'react';
import type { FC } from 'react';
import type { GlyphProps, GlyphsProps } from '../../types';
import AnimatedGlyphs from './private/AnimatedGlyphs';
import type { BaseGlyphSeriesProps } from './private/BaseGlyphSeries';
import BaseGlyphSeries from './private/BaseGlyphSeries';
import defaultRenderGlyph from './private/defaultRenderGlyph';

export default function AnimatedGlyphSeries<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
>({
  renderGlyph = defaultRenderGlyph,
  ...props
}: Omit<BaseGlyphSeriesProps<XScale, YScale, Datum>, 'renderGlyphs'> & {
  renderGlyph?: FC<GlyphProps<Datum>>;
}) {
  const renderGlyphs = useCallback(
    (glyphsProps: GlyphsProps<XScale, YScale, Datum>) => (
      <AnimatedGlyphs {...glyphsProps} renderGlyph={renderGlyph} />
    ),
    [renderGlyph],
  );

  return <BaseGlyphSeries<XScale, YScale, Datum> {...props} renderGlyphs={renderGlyphs} />;
}
