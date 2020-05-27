import React from 'react';
import VoronoiReadme from '!!raw-loader!../../../../vx-voronoi/Readme.md';
import VoronoiPolygon from '../../../../vx-voronoi/src/components/VoronoiPolygon';
import voronoi from '../../../../vx-voronoi/src/voronoi';
import DocPage from '../../components/DocPage';

const components = [voronoi, VoronoiPolygon];

export default () => <DocPage components={components} readme={VoronoiReadme} vxPackage="voronoi" />;
