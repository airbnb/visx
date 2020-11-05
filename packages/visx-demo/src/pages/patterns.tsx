import React from 'react';
import Show from '../components/Show';
import Patterns from '../sandboxes/visx-pattern/Example';
import PatternsSource from '!!raw-loader!../sandboxes/visx-pattern/Example';
import packageJson from '../sandboxes/visx-pattern/package.json';

const PatternsPage = () => {
  return (
    <Show
      component={Patterns}
      title="Patterns"
      margin={{
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
      }}
      codeSandboxDirectoryName="visx-pattern"
      packageJson={packageJson}
    >
      {PatternsSource}
    </Show>
  );
};
export default PatternsPage;
