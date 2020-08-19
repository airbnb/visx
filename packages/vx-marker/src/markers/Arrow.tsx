import React from 'react';
import Marker, { MarkerProps } from './Marker';

interface MarkerArrowProps {
  id: string;
  size?: number;
  strokeWidth?: number;
}

export default function MarkerArrow({
  id,
  size = 9,
  strokeWidth = 1,
  ...restProps
}: MarkerArrowProps & Omit<MarkerProps, 'children'>) {
  const max = size + strokeWidth * 2;
  const midX = size;
  const midY = max / 2;
  const points = `0 0, ${size} ${size / 2}, 0 ${size}`;
  return (
    <Marker
      id={id}
      markerWidth={max}
      markerHeight={max}
      refX={midX}
      refY={midY}
      orient="auto"
      markerUnits="strokeWidth"
      fill="none"
      strokeWidth={strokeWidth}
      {...restProps}
    >
      <g transform={`translate(${strokeWidth}, ${strokeWidth})`}>
        <polyline points={points} />
      </g>
    </Marker>
  );
}
