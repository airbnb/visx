import React from 'react';
import { GeoPath, GeoProjection } from 'd3-geo';
import { GraticuleProps } from '../graticule/Graticule';
import { GeoPermissibleObjects, Projection as ProjectionShape } from '../types';
export declare type ProjectionProps<Datum extends GeoPermissibleObjects = GeoPermissibleObjects> = {
    /** Array of features to project. */
    data: Datum[];
    /** Preset projection name, or custom projection function which returns a GeoProjection. */
    projection?: ProjectionShape;
    /** Hook to render above features, passed the configured projectionFunc. */
    projectionFunc?: (projection: GeoProjection) => React.ReactNode;
    /** Sets the projection’s clipping circle radius to the specified angle in degree. */
    clipAngle?: number;
    /**
     * Sets the projection’s viewport clip extent to the specified bounds in pixels. extent bounds
     * are specified as an array [[x₀, y₀], [x₁, y₁]], where x₀ is the left-side of the viewport,
     * y₀ is the top, x₁ is the right and y₁ is the bottom.
     */
    clipExtent?: [[number, number], [number, number]];
    /**
     * Sets the projection’s scale factor to the specified value. The scale factor corresponds linearly
     * to the distance between projected points; however, absolute scale factors are not equivalent
     * across projections.
     */
    scale?: number;
    /**
     * Sets the projection’s translation offset, which determines the pixel coordinates of the
     * projection’s center, to the specified two-element array [tx, ty].
     */
    translate?: [number, number];
    /** Sets the projection’s center to the specified two-element array of longitude and latitude in degrees. */
    center?: [number, number];
    /** Sets the projection’s three-axis spherical rotation to the specified angles [lambda, phi [, gamma]], corresponding to yaw, pitch, and roll. */
    rotate?: [number, number] | [number, number, number];
    /** Sets the threshold for the projection’s adaptive resampling to the specified value in pixels. */
    precision?: number;
    /**
     * Sets the projection’s scale and translate to fit the specified GeoJSON object in the center of the given extent.
     * The extent is specified as an array [[x₀, y₀], [x₁, y₁]], where x₀ is the left side of the bounding box,
     * y₀ is the top, x₁ is the right and y₁ is the bottom.
     */
    fitExtent?: [[[number, number], [number, number]], any];
    /** Convenience prop for props.fitExtent where the top-left corner of the extent is [0, 0]. */
    fitSize?: [[number, number], any];
    /** Hook to render anything at the centroid of a feature. */
    centroid?: (centroid: [number, number], feature: ParsedFeature<Datum>) => React.ReactNode;
    /** className to apply to feature path elements.  */
    className?: string;
    /** Override render function which is passed the  */
    children?: (args: {
        path: GeoPath<any, GeoPermissibleObjects>;
        features: ParsedFeature<Datum>[];
    }) => React.ReactNode;
    /** Function invoked for each feature which returns a React.Ref to the projection path element for that feature. */
    innerRef?: (feature: ParsedFeature<Datum>, index: number) => React.Ref<SVGPathElement>;
    /** If specified, renders a Graticule with the specified props. Specify `graticule.foreground = true` to be rendered on top of features. */
    graticule?: Omit<GraticuleProps, 'lines'> & {
        foreground: boolean;
    };
    /** If specified, renders a Graticule lines with the specified props. Specify `graticuleLines.foreground = true` to be rendered on top of features. */
    graticuleLines?: Omit<GraticuleProps, 'lines'> & {
        foreground: boolean;
    };
    /** If specified, renders a Graticule outline with the specified props. Specify `graticuleOutline.foreground = true` to be rendered on top of features. */
    graticuleOutline?: Omit<GraticuleProps, 'outline'> & {
        foreground: boolean;
    };
    /** Sets the radius used to display Point and MultiPoint geometries to the specified number. */
    pointRadius?: number;
};
export interface ParsedFeature<Datum> {
    feature: Datum;
    type: ProjectionShape;
    projection: GeoProjection;
    index: number;
    centroid: [number, number];
    path: string | null;
}
/**
 * Component for all projections.
 */
export default function Projection<Datum extends GeoPermissibleObjects>({ data, projection, projectionFunc, clipAngle, clipExtent, scale, translate, center, rotate, precision, fitExtent, fitSize, centroid, graticule, graticuleLines, graticuleOutline, className, innerRef, pointRadius, children, ...restProps }: ProjectionProps<Datum> & Omit<React.SVGProps<SVGPathElement>, keyof ProjectionProps<Datum>>): JSX.Element;
//# sourceMappingURL=Projection.d.ts.map