import type { CSSProperties } from 'react';

export type ShapeRectProps = {
  /** The fill color for the rectangle. */
  fill?: string;
  /** Width of the rectangle. */
  width?: string | number;
  /** Height of the rectangle. */
  height?: string | number;
  /** Additional CSS styles to apply to the rectangle. */
  style?: CSSProperties;
};

export default function ShapeRect({ fill, width, height, style }: ShapeRectProps) {
  const cleanWidth = typeof width === 'string' || typeof width === 'undefined' ? 15 : width;
  const cleanHeight = typeof height === 'string' || typeof height === 'undefined' ? 15 : height;
  return (
    <svg width={cleanWidth} height={cleanHeight}>
      <rect width={cleanWidth} height={cleanHeight} fill={fill} style={style} />
    </svg>
  );
}
