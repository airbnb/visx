/* This test verifies that these modules and types are exported correctly */
import {
  // @ts-expect-error Make sure invalid imports fail:
  INVALID_TYPE,
  ExtendedFeature,
  ExtendedFeatureCollection,
  ExtendedGeometryCollection,
  GeoCircleGenerator,
  GeoConicProjection,
  GeoContext,
  GeoGeometryObjects,
  GeoGraticuleGenerator,
  GeoIdentityTransform,
  GeoPath,
  GeoPermissibleObjects,
  GeoProjection,
  GeoRawProjection,
  GeoRotation,
  GeoSphere,
  GeoStreamWrapper,
  GeoStream,
  GeoTransformPrototype,
  geoAlbers,
  geoAlbersUsa,
  geoArea,
  geoAzimuthalEqualArea,
  geoAzimuthalEqualAreaRaw,
  geoAzimuthalEquidistant,
  geoAzimuthalEquidistantRaw,
  geoBounds,
} from '@visx/vendor/d3-geo';

describe('d3-geo', () => {
  it('exports valid functions', () => {
    expect(geoBounds).toBeInstanceOf(Function);
  });
});
