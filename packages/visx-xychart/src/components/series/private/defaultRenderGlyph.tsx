import React from 'react';
import { GlyphProps } from '../../../types';

export default function defaultRenderGlyph<Datum extends object>({
  key,
  color,
  x,
  y,
  size,
  onPointerMove,
  onPointerOut,
  onPointerUp,
}: GlyphProps<Datum>) {
  return (
    <circle
      className="visx-circle-glyph"
      key={key}
      fill={color}
      r={size / 2}
      cx={x}
      cy={y}
      onPointerMove={onPointerMove}
      onPointerOut={onPointerOut}
      onPointerUp={onPointerUp}
    />
  );
}
