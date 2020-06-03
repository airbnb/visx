import React from 'react';
import VoronoiReadme from '!!raw-loader!../../../../vx-voronoi/Readme.md';
import VoronoiPolygon from '../../../../vx-voronoi/src/components/VoronoiPolygon';
import voronoi from '../../../../vx-voronoi/src/voronoi';
import DocPage from '../../components/DocPage';
import VoronoiTile from '../../components/Gallery/VoronoiTile';

const components = [voronoi, VoronoiPolygon];

const examples = [VoronoiTile];

export default () => (
  <DocPage components={components} examples={examples} readme={VoronoiReadme} vxPackage="voronoi" />
);
