import React from 'react';
import GeoReadme from '!!raw-loader!../../../../vx-geo/Readme.md';
import Graticule from '../../../../vx-geo/src/graticule/Graticule';
import Albers from '../../../../vx-geo/src/projections/Albers';
import AlbersUsa from '../../../../vx-geo/src/projections/AlbersUsa';
import CustomProjection from '../../../../vx-geo/src/projections/CustomProjection';
import EqualEarth from '../../../../vx-geo/src/projections/EqualEarth';
import Mercator from '../../../../vx-geo/src/projections/Mercator';
import NaturalEarth from '../../../../vx-geo/src/projections/NaturalEarth';
import Orthographic from '../../../../vx-geo/src/projections/Orthographic';
import Projection from '../../../../vx-geo/src/projections/Projection';
import DocPage from '../../components/DocPage';
import GeoMercatorTile from '../../components/Gallery/GeoMercatorTile';
import GeoCustomTile from '../../components/Gallery/GeoCustomTile';

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

const examples = [GeoMercatorTile, GeoCustomTile];

export default () => (
  <DocPage components={components} examples={examples} readme={GeoReadme} vxPackage="geo" />
);
