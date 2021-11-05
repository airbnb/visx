import React from 'react';
import cx from 'classnames';
import { Group } from '@visx/group';
import {
  geoOrthographic,
  geoAlbers,
  geoAlbersUsa,
  geoMercator,
  geoNaturalEarth1,
  geoEqualEarth,
  geoPath,
  GeoPath,
  GeoProjection,
  ExtendedFeature,
} from 'd3-geo';
// this is just for types
// eslint-disable-next-line import/no-unresolved
import { LineString, Polygon, MultiLineString } from 'geojson';

import Graticule, { GraticuleProps } from '../graticule/Graticule';
import { GeoPermissibleObjects, ProjectionPreset, Projection as ProjectionShape } from '../types';

const projectionMapping: { [projection in ProjectionPreset]: () => GeoProjection } = {
  orthographic: () => geoOrthographic(),
  albers: () => geoAlbers(),
  albersUsa: () => geoAlbersUsa(),
  mercator: () => geoMercator(),
  naturalEarth: () => geoNaturalEarth1(),
  equalEarth: () => geoEqualEarth(),
};

export type ProjectionProps<Datum extends GeoPermissibleObjects = GeoPermissibleObjects> = {
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
  fitExtent?: [
    [[number, number], [number, number]],
    ExtendedFeature, // ExtendedFeature | ExtendedFeatureCollection | GeoGeometryObjects,
  ];
  /** Convenience prop for props.fitExtent where the top-left corner of the extent is [0, 0]. */
  fitSize?: [
    [number, number],
    ExtendedFeature, // ExtendedFeature | ExtendedFeatureCollection | GeoGeometryObjects
  ];
  /** Hook to render anything at the centroid of a feature. */
  centroid?: (centroid: [number, number], feature: ParsedFeature<Datum>) => React.ReactNode;
  /** className to apply to feature path elements.  */
  className?: string;
  /** Override render function which is passed path data and a copy of the constructed projection.  */
  children?: (args: {
    path: GeoPath<unknown, GeoPermissibleObjects>;
    features: ParsedFeature<Datum>[];
    projection: GeoProjection;
  }) => React.ReactNode;
  /** Function invoked for each feature which returns a React.Ref to the projection path element for that feature. */
  innerRef?: (feature: ParsedFeature<Datum>, index: number) => React.Ref<SVGPathElement>;
  /** If specified, renders a Graticule with the specified props. Specify `graticule.foreground = true` to be rendered on top of features. */
  graticule?: Omit<GraticuleProps, 'lines'> & { foreground: boolean };
  /** If specified, renders a Graticule lines with the specified props. Specify `graticuleLines.foreground = true` to be rendered on top of features. */
  graticuleLines?: Omit<GraticuleProps, 'lines'> & { foreground: boolean };
  /** If specified, renders a Graticule outline with the specified props. Specify `graticuleOutline.foreground = true` to be rendered on top of features. */
  graticuleOutline?: Omit<GraticuleProps, 'outline'> & { foreground: boolean };
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
export default function Projection<Datum extends GeoPermissibleObjects>({
  data,
  projection = 'mercator',
  projectionFunc,
  clipAngle,
  clipExtent,
  scale,
  translate,
  center,
  rotate,
  precision,
  fitExtent,
  fitSize,
  centroid,
  graticule,
  graticuleLines,
  graticuleOutline,
  className,
  innerRef,
  pointRadius,
  children,
  ...restProps
}: ProjectionProps<Datum> & Omit<React.SVGProps<SVGPathElement>, keyof ProjectionProps<Datum>>) {
  const maybeCustomProjection =
    typeof projection === 'string' ? projectionMapping[projection] : projection;

  const currProjection = maybeCustomProjection();

  if (clipAngle && currProjection.clipAngle) currProjection.clipAngle(clipAngle);
  if (clipExtent && currProjection.clipExtent) currProjection.clipExtent(clipExtent);
  if (scale && currProjection.scale) currProjection.scale(scale);
  if (translate && currProjection.translate) currProjection.translate(translate);
  if (center && currProjection.center) currProjection.center(center);
  if (rotate && currProjection.rotate) currProjection.rotate(rotate);
  if (precision && currProjection.precision) currProjection.precision(precision);
  if (fitExtent && currProjection.fitExtent) currProjection.fitExtent(...fitExtent);
  if (fitSize && currProjection.fitSize) currProjection.fitSize(...fitSize);

  const path = geoPath().projection(currProjection);

  if (pointRadius) path.pointRadius(pointRadius);

  const features: ParsedFeature<Datum>[] = data.map((feature, i) => ({
    feature,
    type: projection,
    projection: currProjection,
    index: i,
    centroid: path.centroid(feature),
    path: path(feature),
  }));

  if (children) return <>{children({ path, features, projection: currProjection })}</>;

  return (
    <Group className="visx-geo">
      {graticule && !graticule.foreground && (
        <Graticule graticule={(ml: MultiLineString) => path(ml) || ''} {...graticule} />
      )}
      {graticuleLines && !graticuleLines.foreground && (
        <Graticule lines={(l: LineString) => path(l) || ''} {...graticuleLines} />
      )}
      {graticuleOutline && !graticuleOutline.foreground && (
        <Graticule outline={(p: Polygon) => path(p) || ''} {...graticuleOutline} />
      )}

      {features.map((feature, i) => (
        <g key={`${projection}-${i}`}>
          <path
            className={cx(`visx-geo-${projection}`, className)}
            d={feature.path || ''}
            ref={innerRef?.(feature, i)}
            {...restProps}
          />
          {centroid?.(feature.centroid, feature)}
        </g>
      ))}

      {/* TODO: Maybe find a different way to pass projection function to use for example invert */}
      {projectionFunc?.(currProjection)}

      {graticule?.foreground && (
        <Graticule graticule={(ml: MultiLineString) => path(ml) || ''} {...graticule} />
      )}

      {graticuleLines?.foreground && (
        <Graticule lines={(l: LineString) => path(l) || ''} {...graticuleLines} />
      )}
      {graticuleOutline?.foreground && (
        <Graticule outline={(p: Polygon) => path(p) || ''} {...graticuleOutline} />
      )}
    </Group>
  );
}
