import React from 'react';
import Show from '../components/Show';
import Patterns from '../docs-v2/examples/vx-pattern/Example';
import PatternsSource from '!!raw-loader!../docs-v2/examples/vx-pattern/Example';

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
    >
      {PatternsSource}
    </Show>
  );
};
