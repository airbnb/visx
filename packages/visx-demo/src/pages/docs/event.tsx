import React from 'react';
import EventReadme from '!!raw-loader!../../../../visx-event/Readme.md';
import DocPage from '../../components/DocPage';
import AreaTile from '../../components/Gallery/AreaTile';
import DotsTile from '../../components/Gallery/DotsTile';
import VoronoiTile from '../../components/Gallery/VoronoiTile';

const examples = [AreaTile, DotsTile, VoronoiTile];

const EventDocs = () => <DocPage readme={EventReadme} examples={examples} visxPackage="event" />;
export default EventDocs;
