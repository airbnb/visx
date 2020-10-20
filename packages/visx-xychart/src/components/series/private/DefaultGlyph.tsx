import React from 'react';
import { GlyphProps } from './BaseGlyphSeries';

export default function DefaultGlyph<Datum extends object>({
  color,
  x,
  y,
  size,
}: GlyphProps<Datum>) {
  return <circle fill={color} r={size / 2} cx={x} cy={y} />;
}
