import React from 'react';
import ResponsiveReadme from '!!raw-loader!../../../../vx-responsive/Readme.md';
import ParentSize from '../../../../vx-responsive/src/components/ParentSize';
import ScaleSVG from '../../../../vx-responsive/src/components/ScaleSVG';
import DocPage from '../../components/DocPage';

const components = [ParentSize, ScaleSVG];

export default () => (
  <DocPage components={components} readme={ResponsiveReadme} vxPackage="responsive" />
);
