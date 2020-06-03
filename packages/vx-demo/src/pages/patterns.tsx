import React from 'react';
import Show from '../components/Show';
import Patterns from '../sandboxes/vx-pattern/Example';
import PatternsSource from '!!raw-loader!../sandboxes/vx-pattern/Example';
import packageJson from '../sandboxes/vx-pattern/package.json';

export default () => {
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
      codeSandboxDirectoryName="vx-pattern"
      packageJson={packageJson}
    >
      {PatternsSource}
    </Show>
  );
};
