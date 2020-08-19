import React from 'react';
import Marker, { MarkerProps } from './Marker';

interface MarkerCrossProps {
  id: string;
  size?: number;
  strokeWidth?: number;
}

export default function MarkerCross({
  id,
  size = 12,
  strokeWidth = 0,
  ...restProps
}: MarkerCrossProps & Omit<MarkerProps, 'children'>) {
  const bounds = size + strokeWidth;
  const mid = size / 2;
  const points = `0 ${mid}, ${mid} ${mid}, ${mid} 0, ${mid} ${size}, ${mid} ${mid}, ${size} ${mid}`;
  return (
    <Marker
      id={id}
      markerWidth={bounds}
      markerHeight={bounds}
      refX={mid}
      refY={mid}
      orient="auto"
      markerUnits="strokeWidth"
      fill="none"
      strokeWidth={strokeWidth}
      {...restProps}
    >
      <polyline points={points} />
    </Marker>
  );
}
