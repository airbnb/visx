import { AxisScale } from '@visx/axis';
import React, { useMemo } from 'react';
import { useTransition, animated, interpolate } from 'react-spring';
import getScaleBaseline from '../../../utils/getScaleBaseline';
import { GlyphProps, GlyphsProps } from '../../../types';
import { cleanColor, colorHasUrl } from '../../../utils/cleanColorString';

type ConfigKeys = 'enter' | 'update' | 'from' | 'leave';

/** Memoized useTransition config */
export function useAnimatedGlyphsConfig<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object
>({
  xScale,
  yScale,
  horizontal,
}: {
  xScale: XScale;
  yScale: YScale;
  horizontal?: boolean;
}): {
  [key in ConfigKeys]: (props: GlyphProps<Datum>) => React.CSSProperties;
} {
  const xScaleBaseline = getScaleBaseline(xScale);
  const yScaleBaseline = getScaleBaseline(yScale);
  return useMemo(
    () => ({
      unique: true,
      from: ({ x, y, color }) => ({
        x: horizontal ? xScaleBaseline : x,
        y: horizontal ? y : yScaleBaseline,
        color: cleanColor(color),
        opacity: 0,
      }),
      leave: ({ x, y, color }) => ({
        x: horizontal ? xScaleBaseline : x,
        y: horizontal ? y : yScaleBaseline,
        color: cleanColor(color),
        opacity: 0,
      }),
      enter: ({ x, y, color }) => ({ x, y, color: cleanColor(color), opacity: 1 }),
      update: ({ x, y, color }) => ({ x, y, color: cleanColor(color), opacity: 1 }),
    }),
    [xScaleBaseline, yScaleBaseline, horizontal],
  );
}

export default function AnimatedGlyphs<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object
>({
  renderGlyph,
  glyphs,
  horizontal,
  xScale,
  yScale,
  onBlur,
  onFocus,
  onPointerMove,
  onPointerOut,
  onPointerUp,
}: {
  // unanimated Glyph component
  renderGlyph: React.FC<GlyphProps<Datum>>;
} & GlyphsProps<XScale, YScale, Datum>) {
  const animatedGlyphs = useTransition(
    glyphs,
    glyph => glyph.key,
    useAnimatedGlyphsConfig({ xScale, yScale, horizontal }),
  );

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {animatedGlyphs.map((
        // @ts-ignore x/y aren't in react-spring's CSSProperties
        { item, key, props: { x, y, color, opacity } },
      ) => (
        <animated.g
          key={key}
          transform={interpolate([x, y], (xVal, yVal) => `translate(${xVal}, ${yVal})`)}
          color={color}
          opacity={opacity}
        >
          {renderGlyph({
            key,
            datum: item.datum,
            index: item.index,
            x: 0,
            y: 0,
            size: item.size,
            // currentColor doesn't work with url-based colors (pattern, gradient)
            // otherwise currentColor allows us to animate the color of the <g /> element
            color: colorHasUrl(item.color) ? item.color : 'currentColor',
            onBlur,
            onFocus,
            onPointerMove,
            onPointerOut,
            onPointerUp,
          })}
        </animated.g>
      ))}
    </>
  );
}
