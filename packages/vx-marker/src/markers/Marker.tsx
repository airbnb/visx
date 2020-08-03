import React from 'react';

export interface Props {
  /** Unique id for the gradient. Should be unique across all page elements. */
  id: string;
  /** the width of the marker viewport */
  markerWidth?: string | number;
  /** the height of the marker viewport */
  markerHeight?: string | number;
  /** set the coordinate system for the markerWidth, markerHeight, and <marker> contents  */
  markerUnits?: string;
  /** the x coordinate for the reference point of the maker */
  refX?: string | number;
  /** the y coordinate for the reference point of the maker */
  refY?: string | number;
  strokeWidth?: number;
  /** the <marker> contents */
  children: React.ReactNode;
}

export type MarkerProps = Props & Omit<React.SVGProps<SVGMarkerElement>, keyof Props>;

export default function Marker({
  id,
  markerWidth = 3,
  markerHeight = 3,
  markerUnits = 'userSpaceOnUse',
  children,
  ...restProps
}: MarkerProps) {
  return (
    <defs>
      <marker
        id={id}
        markerWidth={markerWidth}
        markerHeight={markerHeight}
        markerUnits={markerUnits}
        {...restProps}
      >
        {children}
      </marker>
    </defs>
  );
}
