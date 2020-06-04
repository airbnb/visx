import React from 'react';
import ResponsiveReadme from '!!raw-loader!../../../../vx-responsive/Readme.md';
import ParentSize from '../../../../vx-responsive/src/components/ParentSize';
import ScaleSVG from '../../../../vx-responsive/src/components/ScaleSVG';
import DocPage from '../../components/DocPage';
import ResponsiveTile from '../../components/Gallery/ResponsiveTile';

const components = [ParentSize, ScaleSVG];

const examples = [ResponsiveTile];

export default () => (
  <DocPage
    components={components}
    examples={examples}
    readme={ResponsiveReadme}
    vxPackage="responsive"
  />
);
