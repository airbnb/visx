import React from 'react';
import Marker, { MarkerProps } from './Marker';

interface MarkerArrowProps {
  id: string;
}

export default function MarkerArrow({
  id,
  ...restProps
}: MarkerArrowProps & Omit<MarkerProps, 'children'>) {
  return (
    <Marker
      id={id}
      markerWidth={9}
      markerHeight={9}
      refX={8}
      refY={5}
      orient="auto"
      markerUnits="strokeWidth"
      fill="none"
      {...restProps}
    >
      <polyline points="1 1, 9 5, 1 9" />
    </Marker>
  );
}
