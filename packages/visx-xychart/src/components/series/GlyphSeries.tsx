import { AxisScale } from '@visx/axis';
import React, { useCallback } from 'react';
import BaseGlyphSeries, {
  BaseGlyphSeriesProps,
  GlyphProps,
  GlyphsProps,
} from './private/BaseGlyphSeries';
import DefaultGlyph from './private/DefaultGlyph';

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
    ({ glyphs }: GlyphsProps<XScale, YScale, Datum>) =>
      glyphs.map(({ key, ...glyph }) => <Glyph key={key} {...glyph} />),
    [],
  );
  return (
    <BaseGlyphSeries<XScale, YScale, Datum>
      {...props}
      // @TODO currently generics for non-SeriesProps are not passed correctly in
      // withRegisteredData HOC
      // @ts-ignore
      renderGlyphs={renderGlyphs}
    />
  );
}
