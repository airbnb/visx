import type { CSSProperties } from 'react';
import { Group } from '@visx/group';

export type ShapeCircleProps = {
  /** The fill color for the circle. */
  fill?: string;
  /** Width of the container. The circle radius is derived from max(width, height). */
  width?: string | number;
  /** Height of the container. The circle radius is derived from max(width, height). */
  height?: string | number;
  /** Additional CSS styles to apply to the circle. */
  style?: CSSProperties;
};

export default function ShapeCircle({ fill, width, height, style }: ShapeCircleProps) {
  const cleanWidth = typeof width === 'string' || typeof width === 'undefined' ? 0 : width;
  const cleanHeight = typeof height === 'string' || typeof height === 'undefined' ? 0 : height;
  const size = Math.max(cleanWidth, cleanHeight);
  const radius = size / 2;
  return (
    <svg width={size} height={size}>
      <Group top={radius} left={radius}>
        <circle r={radius} fill={fill} style={style} />
      </Group>
    </svg>
  );
}
