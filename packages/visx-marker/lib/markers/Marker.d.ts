import React from 'react';
export interface Props {
    /** Unique id for the `<marker>`. Should be unique across all page elements. */
    id: string;
    /** A number used to determine the size of the bounding box the marker content. */
    size?: number;
    /** The width of the marker viewport */
    markerWidth?: string | number;
    /** The height of the marker viewport */
    markerHeight?: string | number;
    /** Set the coordinate system for the markerWidth, markerHeight, and `<marker>` contents  */
    markerUnits?: string;
    /** The x coordinate for the reference point of the maker */
    refX?: string | number;
    /** The y coordinate for the reference point of the maker */
    refY?: string | number;
    /** The stroke width. constrained to a `number` type due to use in bounding box calculations */
    strokeWidth?: number;
    /** The <marker> contents. Typically one of: `<path>`, `<line>`, `<polyline>`, or `<polygon>` */
    children: React.ReactNode;
}
export declare type MarkerProps = Props & Omit<React.SVGProps<SVGMarkerElement>, keyof Props>;
export declare type MarkerComponentProps = Omit<MarkerProps, 'children'>;
export default function Marker({ id, markerWidth, markerHeight, markerUnits, children, ...restProps }: MarkerProps): JSX.Element;
//# sourceMappingURL=Marker.d.ts.map