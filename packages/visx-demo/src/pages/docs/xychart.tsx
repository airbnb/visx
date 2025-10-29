import React from 'react';
import XYChartReadme from '!!raw-loader!../../../../visx-xychart/README.md';
import * as XYChartPackage from '../../../../visx-xychart/src';
import DocPage from '../../components/DocPage';
import { attachDocGenInfo } from '../../utils/getDocGenInfo';
import XYChartTile from '../../components/Gallery/XYChartTile';

// Attach documentation to components
const componentsWithDocs = attachDocGenInfo('xychart', XYChartPackage);

const components = Object.values(componentsWithDocs);

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
