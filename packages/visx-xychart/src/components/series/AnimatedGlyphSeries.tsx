import { AxisScale } from '@visx/axis';
import React, { useCallback } from 'react';
import { useTransition, animated, interpolate } from 'react-spring';
import BaseGlyphSeries, { BaseGlyphSeriesProps, GlyphProps } from './private/BaseGlyphSeries';

function DefaultGlyph<Datum extends object>({ color, x, y, size }: GlyphProps<Datum>) {
  return <circle fill={color} r={size / 2} cx={x} cy={y} />;
}

function AnimatedGlyphs<Datum extends object>({
  Glyph,
  glyphs,
}: {
  Glyph: React.FC<GlyphProps<Datum>>;
  glyphs: GlyphProps<Datum>[];
}) {
  const animatedGlyphs = useTransition(glyphs, glyph => glyph.key, {
    unique: true,
    // from: { x: 0, y: 0, opacity: 0 },
    // leave: { x: 0, y: 0, opacity: 0 },
    enter: glyph => ({ x: glyph.x, y: glyph.y, opacity: 1, color: glyph.color }),
    update: glyph => ({ x: glyph.x, y: glyph.y, opacity: 1, color: glyph.color }),
  });

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {animatedGlyphs.map(({ item, key, props: { x, y, color } }) => (
        <animated.g
          key={key}
          transform={interpolate([x, y], (xVal, yVal) => `translate(${xVal}, ${yVal})`)}
          color={color}
        >
          <Glyph
            key={key}
            datum={item.datum}
            index={item.index}
            x={0}
            y={0}
            size={item.size}
            color="currentColor"
          />
        </animated.g>
      ))}
    </>
  );
}

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
    (glyphs: GlyphProps<Datum>[]) => <AnimatedGlyphs Glyph={Glyph} glyphs={glyphs} />,
    [Glyph],
  );
  return <BaseGlyphSeries<XScale, YScale, Datum> {...props} renderGlyphs={renderGlyphs} />;
}
