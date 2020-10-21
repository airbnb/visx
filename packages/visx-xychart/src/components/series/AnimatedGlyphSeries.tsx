import { AxisScale } from '@visx/axis';
import React, { useCallback } from 'react';
import { GlyphProps, GlyphsProps } from '../../types';
import AnimatedGlyphs from './private/AnimatedGlyphs';
import BaseGlyphSeries, { BaseGlyphSeriesProps } from './private/BaseGlyphSeries';
import defaultRenderGlyph from './private/defaultRenderGlyph';

export default function AnimatedGlyphSeries<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object
>({
  renderGlyph = defaultRenderGlyph,
  ...props
}: Omit<BaseGlyphSeriesProps<XScale, YScale, Datum>, 'renderGlyphs'> & {
  renderGlyph?: React.FC<GlyphProps<Datum>>;
}) {
  const renderGlyphs = useCallback(
    ({ glyphs, xScale, yScale, horizontal }: GlyphsProps<XScale, YScale, Datum>) => (
      <AnimatedGlyphs
        renderGlyph={renderGlyph}
        glyphs={glyphs}
        xScale={xScale}
        yScale={yScale}
        horizontal={horizontal}
      />
    ),
    [renderGlyph],
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
