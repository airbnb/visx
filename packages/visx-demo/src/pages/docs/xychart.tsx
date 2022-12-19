import React from 'react';
import XYChartReadme from '!!raw-loader!../../../../visx-xychart/README.md';
import * as XYChartPackage from '@visx/xychart';
import DocPage from '../../components/DocPage';
import XYChartTile from '../../components/Gallery/XYChartTile';

const components = Object.values(XYChartPackage);

const examples = [XYChartTile];

function XYChartDocs() {
  return (
    <DocPage
      components={components}
      examples={examples}
      readme={XYChartReadme}
      visxPackage="xychart"
    />
  );
}

export default XYChartDocs;
