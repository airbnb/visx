import React from 'react';
import ReactSpringReadme from '!!raw-loader!../../../../vx-react-spring/README.md';
import AnimatedAxis from '../../../../vx-react-spring/src/axis/AnimatedAxis';
import DocPage from '../../components/DocPage';
import AxisTile from '../../components/Gallery/AxisTile';

const components = [AnimatedAxis];

const examples = [AxisTile];

export default () => (
  <DocPage
    components={components}
    examples={examples}
    readme={ReactSpringReadme}
    vxPackage="react-spring"
  />
);
