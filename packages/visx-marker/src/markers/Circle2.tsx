import React from 'react';
import Marker, { MarkerComponentProps } from './Marker';

export default function MarkerCircle2({
  id,
  size = 9,
  strokeWidth = 1,
  ...restProps
}: MarkerComponentProps) {
  const diameter = size * 2;
  const bounds = diameter + strokeWidth;
  const mid = bounds / 2;
  return (
    <Marker
      id={id}
      markerWidth={bounds}
      markerHeight={bounds}
      refX={mid}
      refY={mid}
      orient="auto-start-reverse"
      markerUnits="strokeWidth"
      strokeWidth={strokeWidth}
      {...restProps}
    >
      <circle r={size} cx={mid} cy={mid} />
    </Marker>
  );
}
