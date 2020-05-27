import React from 'react';
import ThresholdReadme from '!!raw-loader!../../../../vx-threshold/Readme.md';
import Threshold from '../../../../vx-threshold/src/Threshold';
import DocPage from '../../components/DocPage';

const components = [Threshold];

export default () => (
  <DocPage components={components} readme={ThresholdReadme} vxPackage="threshold" />
);
