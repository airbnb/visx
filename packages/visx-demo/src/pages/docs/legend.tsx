import React from 'react';
import LegendReadme from '!!raw-loader!../../../../visx-legend/Readme.md';
import Legend from '../../../../visx-legend/src/legends/Legend';
import Linear from '../../../../visx-legend/src/legends/Linear';
import Ordinal from '../../../../visx-legend/src/legends/Ordinal';
import Quantile from '../../../../visx-legend/src/legends/Quantile';
import Size from '../../../../visx-legend/src/legends/Size';
import Threshold from '../../../../visx-legend/src/legends/Threshold';
import DocPage from '../../components/DocPage';
import LegendsTile from '../../components/Gallery/LegendsTile';

const components = [Linear, Ordinal, Quantile, Size, Threshold, Legend];

const examples = [LegendsTile];

const LegendDocs = () => (
  <DocPage components={components} examples={examples} readme={LegendReadme} visxPackage="legend" />
);
export default LegendDocs;
