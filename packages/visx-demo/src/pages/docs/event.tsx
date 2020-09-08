import React from 'react';
import EventReadme from '!!raw-loader!../../../../vx-event/Readme.md';
import DocPage from '../../components/DocPage';
import AreaTile from '../../components/Gallery/AreaTile';
import DotsTile from '../../components/Gallery/DotsTile';
import VoronoiTile from '../../components/Gallery/VoronoiTile';

const examples = [AreaTile, DotsTile, VoronoiTile];

export default () => <DocPage readme={EventReadme} examples={examples} vxPackage="event" />;
