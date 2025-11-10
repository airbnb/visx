import type { GlyphProps } from '../../../types';

export default function defaultRenderGlyph<Datum extends object>({
  key,
  color,
  x,
  y,
  size,
  onBlur,
  onFocus,
  onPointerMove,
  onPointerOut,
  onPointerUp,
}: GlyphProps<Datum>) {
  return (
    <circle
      className="visx-circle-glyph"
      key={key}
      tabIndex={onBlur || onFocus ? 0 : undefined}
      fill={color}
      r={size / 2}
      cx={x}
      cy={y}
      onBlur={onBlur}
      onFocus={onFocus}
      onPointerMove={onPointerMove}
      onPointerOut={onPointerOut}
      onPointerUp={onPointerUp}
    />
  );
}
