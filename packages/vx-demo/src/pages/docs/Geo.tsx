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
import { DocGenInfo } from '../../types';

const components = [
  // @ts-ignore
  Projection.__docgenInfo,
  // @ts-ignore
  Graticule.__docgenInfo,
  // @ts-ignore
  Albers.__docgenInfo,
  // @ts-ignore
  AlbersUsa.__docgenInfo,
  // @ts-ignore
  CustomProjection.__docgenInfo,
  // @ts-ignore
  EqualEarth.__docgenInfo,
  // @ts-ignore
  Mercator.__docgenInfo,
  // @ts-ignore
  NaturalEarth.__docgenInfo,
  // @ts-ignore
  Orthographic.__docgenInfo,
] as DocGenInfo[];

export default () => <DocPage components={components} readme={GeoReadme} vxPackage="geo" />;
