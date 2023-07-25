import { AxisScale } from '@visx/axis';
import React, { useCallback } from 'react';
import { GlyphProps, GlyphsProps, NearestDatumArgs, NearestDatumReturnType } from '../../types';
import BaseGlyphSeries, { BaseGlyphSeriesProps } from './private/BaseGlyphSeries';
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
  /** Passed to useEventHandlers to override findNearestDatum logic */
  findNearestDatumOverride?: (params: NearestDatumArgs<XScale, YScale, Datum>,) => NearestDatumReturnType<Datum>;
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
  return (
    <BaseGlyphSeries<XScale, YScale, Datum>
      {...props}
      // @TODO currently generics for non-SeriesProps are not passed correctly in
      // withRegisteredData HOC
      // @ts-expect-error
      renderGlyphs={renderGlyphs}
    />
  );
}
