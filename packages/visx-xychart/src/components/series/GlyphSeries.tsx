import { AxisScale } from '@visx/axis';
import React, { useCallback } from 'react';
import BaseGlyphSeries, { BaseGlyphSeriesProps, GlyphProps } from './private/BaseGlyphSeries';

function DefaultGlyph<Datum extends object>({ color, x, y, size }: GlyphProps<Datum>) {
  return <circle fill={color} r={size / 2} cx={x} cy={y} />;
}

export default function GlyphSeries<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object
>({
  Glyph = DefaultGlyph,
  ...props
}: Omit<BaseGlyphSeriesProps<XScale, YScale, Datum>, 'renderGlyphs'> & {
  Glyph?: React.FC<GlyphProps<Datum>>;
}) {
  const renderGlyphs = useCallback(
    (glyphs: GlyphProps<Datum>[]) =>
      glyphs.map(({ key, ...glyph }) => <Glyph key={key} {...glyph} />),
    [],
  );
  return <BaseGlyphSeries<XScale, YScale, Datum> {...props} renderGlyphs={renderGlyphs} />;
}
