import React from 'react';
import GeoReadme from '!!raw-loader!../../../../visx-geo/Readme.md';
import Graticule from '../../../../visx-geo/src/graticule/Graticule';
import Albers from '../../../../visx-geo/src/projections/Albers';
import AlbersUsa from '../../../../visx-geo/src/projections/AlbersUsa';
import CustomProjection from '../../../../visx-geo/src/projections/CustomProjection';
import EqualEarth from '../../../../visx-geo/src/projections/EqualEarth';
import Mercator from '../../../../visx-geo/src/projections/Mercator';
import NaturalEarth from '../../../../visx-geo/src/projections/NaturalEarth';
import Orthographic from '../../../../visx-geo/src/projections/Orthographic';
import Projection from '../../../../visx-geo/src/projections/Projection';
import DocPage from '../../components/DocPage';
import GeoMercatorTile from '../../components/Gallery/GeoMercatorTile';
import GeoCustomTile from '../../components/Gallery/GeoCustomTile';
import GeoAlbersUsaTile from '../../components/Gallery/GeoAlbersUsaTile';

const components = [
  Projection,
  Graticule,
  Albers,
  AlbersUsa,
  CustomProjection,
  EqualEarth,
  Mercator,
  NaturalEarth,
  Orthographic,
];

const examples = [GeoMercatorTile, GeoCustomTile, GeoAlbersUsaTile];

const GeoDocs = () => (
  <DocPage components={components} examples={examples} readme={GeoReadme} visxPackage="geo" />
);
export default GeoDocs;
