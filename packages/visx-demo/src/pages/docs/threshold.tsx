import React from 'react';
import ThresholdReadme from '!!raw-loader!../../../../visx-threshold/Readme.md';
import Threshold from '../../../../visx-threshold/src/Threshold';
import DocPage from '../../components/DocPage';
import ThresholdTile from '../../components/Gallery/ThresholdTile';

const components = [Threshold];

const examples = [ThresholdTile];

const ThresholdDocs = () => (
  <DocPage
    components={components}
    examples={examples}
    readme={ThresholdReadme}
    visxPackage="threshold"
  />
);
export default ThresholdDocs;
