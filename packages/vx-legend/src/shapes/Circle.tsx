import React from 'react';
import { Group } from '@vx/group';

export type ShapeCircleProps = {
  fill?: string;
  width?: string | number;
  height?: string | number;
  style?: React.CSSProperties;
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
