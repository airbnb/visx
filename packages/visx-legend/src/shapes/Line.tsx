import type { CSSProperties } from 'react';
import { Group } from '@visx/group';

export type ShapeShapeLineProps = {
  /** The stroke color for the line. Note: Despite the name, this is used as the stroke, not fill. */
  fill?: string;
  /** Width of the line. */
  width?: string | number;
  /** Height of the container. The line is vertically centered. */
  height?: string | number;
  /** Additional CSS styles to apply to the line. The strokeWidth from style is used for line thickness. */
  style?: CSSProperties;
};

export default function ShapeLine({ fill, width, height, style }: ShapeShapeLineProps) {
  const cleanHeight = typeof height === 'string' || typeof height === 'undefined' ? 0 : height;
  const lineThickness = typeof style?.strokeWidth === 'number' ? style?.strokeWidth : 2;
  return (
    <svg width={width} height={height}>
      <Group top={cleanHeight / 2 - lineThickness / 2}>
        <line
          x1={0}
          x2={width}
          y1={0}
          y2={0}
          stroke={fill}
          strokeWidth={lineThickness}
          style={style}
        />
      </Group>
    </svg>
  );
}
