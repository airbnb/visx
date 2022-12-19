import React from 'react';
import Patterns from '@visx/demo-pattern/Example';
import packageJson from '@visx/demo-pattern/package.json';
import Show from '../components/Show';
import PatternsSource from '!!raw-loader!../sandboxes/visx-pattern/Example';

function PatternsPage() {
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
}
export default PatternsPage;
