import React from 'react';
import ThresholdReadme from '!!raw-loader!../../../../vx-threshold/Readme.md';
import Threshold from '../../../../vx-threshold/src/Threshold';
import DocPage from '../../components/DocPage';
import ThresholdTile from '../../components/Gallery/ThresholdTile';

const components = [Threshold];

const examples = [ThresholdTile];

export default () => (
  <DocPage
    components={components}
    examples={examples}
    readme={ThresholdReadme}
    vxPackage="threshold"
  />
);
