import type { SVGProps } from 'react';
import ClipPath from './ClipPath';

export type RectClipPathProps = {
  /** Unique id for the clipPath. */
  id: string;
  /** x position of the ClipPath rect. */
  x?: string | number;
  /** y position of the ClipPath rect. */
  y?: string | number;
  /** width of the ClipPath rect. */
  width?: string | number;
  /** height of the ClipPath rect. */
  height?: string | number;
};

export default function RectClipPath({
  id,
  x = 0,
  y = 0,
  width = 1,
  height = 1,
  ...restProps
}: RectClipPathProps & Omit<SVGProps<SVGRectElement>, keyof RectClipPathProps>) {
  return (
    <ClipPath id={id}>
      <rect x={x} y={y} width={width} height={height} {...restProps} />
    </ClipPath>
  );
}
