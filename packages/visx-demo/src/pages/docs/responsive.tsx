import React from 'react';
import ResponsiveReadme from '!!raw-loader!../../../../visx-responsive/Readme.md';
import ParentSize from '../../../../visx-responsive/src/components/ParentSize';
import ScaleSVG from '../../../../visx-responsive/src/components/ScaleSVG';
import DocPage from '../../components/DocPage';
import ResponsiveTile from '../../components/Gallery/ResponsiveTile';

const components = [ParentSize, ScaleSVG];

const examples = [ResponsiveTile];

const ResponsiveDocs = () => (
  <DocPage
    components={components}
    examples={examples}
    readme={ResponsiveReadme}
    visxPackage="responsive"
  />
);
export default ResponsiveDocs;
