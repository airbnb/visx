import React from 'react';
import ReactSpringReadme from '!!raw-loader!../../../../visx-react-spring/README.md';
import AnimatedAxis from '../../../../visx-react-spring/src/axis/AnimatedAxis';
import AnimatedGridColumns from '../../../../visx-react-spring/src/grid/AnimatedGridColumns';
import AnimatedGridRows from '../../../../visx-react-spring/src/grid/AnimatedGridRows';
import DocPage from '../../components/DocPage';
import AxisTile from '../../components/Gallery/AxisTile';

const components = [AnimatedAxis, AnimatedGridColumns, AnimatedGridRows];

const examples = [AxisTile];

const ReactSpringDocs = () => (
  <DocPage
    components={components}
    examples={examples}
    readme={ReactSpringReadme}
    visxPackage="react-spring"
  />
);
export default ReactSpringDocs;
