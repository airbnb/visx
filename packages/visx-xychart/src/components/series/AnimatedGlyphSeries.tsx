import { AxisScale } from '@visx/axis';
import React, { useCallback } from 'react';
import AnimatedGlyphs from './private/AnimatedGlyphs';
import BaseGlyphSeries, {
  BaseGlyphSeriesProps,
  GlyphProps,
  GlyphsProps,
} from './private/BaseGlyphSeries';
import DefaultGlyph from './private/DefaultGlyph';

export default function AnimatedGlyphSeries<
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
    ({ glyphs, xScale, yScale, horizontal }: GlyphsProps<XScale, YScale, Datum>) => (
      <AnimatedGlyphs
        Glyph={Glyph}
        glyphs={glyphs}
        xScale={xScale}
        yScale={yScale}
        horizontal={horizontal}
      />
    ),
    [Glyph],
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
