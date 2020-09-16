import { GeoProjection, GeoPermissibleObjects as GeoPermissibleObjectType } from 'd3-geo';

export type GeoPermissibleObjects = GeoPermissibleObjectType;

export type Projection = ProjectionPreset | (() => GeoProjection);

// @TODO: Implement all projections of d3-geo
export type ProjectionPreset =
  | 'orthographic'
  | 'albers'
  | 'albersUsa'
  | 'mercator'
  | 'naturalEarth'
  | 'equalEarth';
