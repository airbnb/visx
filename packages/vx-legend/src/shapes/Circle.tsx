import React from 'react';
import { Group } from '@vx/group';

type CircleProps = React.SVGProps<SVGCircleElement>;
type SVGProps = React.SVGProps<SVGSVGElement>;

export type ShapeCircleProps = {
  fill: CircleProps['fill'];
  width: SVGProps['width'];
  height: SVGProps['height'];
  style: CircleProps['style'];
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
