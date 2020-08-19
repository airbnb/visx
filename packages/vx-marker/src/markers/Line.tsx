import React from 'react';
import Marker, { MarkerProps } from './Marker';

export interface MarkerLineProps {
  id: string;
  size?: number;
  stroke?: string;
  fill?: string;
}

export default function MarkerLine({
  id,
  size = 8,
  stroke,
  strokeWidth = 1,
  fill,
  ...restProps
}: MarkerLineProps & Omit<MarkerProps, 'children'>) {
  const max = Math.max(size, strokeWidth * 2);
  const midX = max / 2;
  const midY = size / 2;
  return (
    <Marker
      id={id}
      markerWidth={max}
      markerHeight={size}
      refX={midX}
      refY={midY}
      orient="auto"
      markerUnits="strokeWidth"
      fill={fill || stroke}
      stroke="none"
      {...restProps}
    >
      <rect width={strokeWidth} height={size} x={midX} />
    </Marker>
  );
}
