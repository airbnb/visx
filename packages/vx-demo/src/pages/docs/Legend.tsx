import React from 'react';
import LegendReadme from '!!raw-loader!../../../../vx-legend/Readme.md';
import Legend from '../../../../vx-legend/src/legends/Legend';
import Linear from '../../../../vx-legend/src/legends/Linear';
import Ordinal from '../../../../vx-legend/src/legends/Ordinal';
import Quantile from '../../../../vx-legend/src/legends/Quantile';
import Size from '../../../../vx-legend/src/legends/Size';
import Threshold from '../../../../vx-legend/src/legends/Threshold';
import DocPage from '../../components/DocPage';
import LegendsTile from '../../components/Gallery/LegendsTile';

const components = [Linear, Ordinal, Quantile, Size, Threshold, Legend];

const examples = [LegendsTile];

export default () => (
  <DocPage components={components} examples={examples} readme={LegendReadme} vxPackage="legend" />
);
