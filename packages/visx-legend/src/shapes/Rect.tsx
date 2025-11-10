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
  return (
    <div
      style={{
        width,
        height,
        background: fill,
        ...style,
      }}
    />
  );
}
