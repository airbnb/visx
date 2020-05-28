import React from 'react';
import CurveReadme from '!!raw-loader!../../../../vx-curve/Readme.md';
import DocPage from '../../components/DocPage';
import CurvesTile from '../../components/Gallery/CurvesTile';

const examples = [CurvesTile];

export default () => <DocPage readme={CurveReadme} examples={examples} vxPackage="curve" />;
