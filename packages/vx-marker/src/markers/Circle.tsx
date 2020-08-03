import React from 'react';
import Marker, { MarkerProps } from './Marker';

interface MarkerCircleProps {
  id: string;
  radius?: number; // todo: support string value and browser units (px, ch, em, etc.)
  strokeWidth?: number; // todo: support string value and browser units (px, ch, em, etc.)
}

export default function MarkerCircle({
  id,
  radius = 4,
  strokeWidth = 0,
  ...restProps
}: MarkerCircleProps & Omit<MarkerProps, 'children'>) {
  const diameter = radius * 2;
  const size = diameter + strokeWidth;
  const mid = size / 2;
  return (
    <Marker
      id={id}
      markerWidth={size}
      markerHeight={size}
      refX={0}
      refY={mid}
      orient="auto-start-reverse"
      markerUnits="strokeWidth"
      fill="steelblue"
      strokeWidth={strokeWidth}
      {...restProps}
    >
      <circle r={radius} cx={mid} cy={mid} />
    </Marker>
  );
}
