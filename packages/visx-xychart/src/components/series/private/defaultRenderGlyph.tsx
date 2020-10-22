import React from 'react';
import { GlyphProps } from '../../../types';

export default function defaultRenderGlyph<Datum extends object>({
  key,
  color,
  x,
  y,
  size,
}: GlyphProps<Datum>) {
  return <circle key={key} fill={color} r={size / 2} cx={x} cy={y} />;
}
