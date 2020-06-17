import React from 'react';
import { Group } from '@vx/group';

export type ShapeShapeLineProps = {
  fill?: string;
  width?: string | number;
  height?: string | number;
  style?: React.CSSProperties;
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
