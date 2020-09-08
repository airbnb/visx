import React from 'react';
import PointReadme from '!!raw-loader!../../../../visx-point/Readme.md';
import DocPage from '../../components/DocPage';
import RadarTile from '../../components/Gallery/RadarTile';

const examples = [RadarTile];

export default () => <DocPage examples={examples} readme={PointReadme} visxPackage="point" />;
