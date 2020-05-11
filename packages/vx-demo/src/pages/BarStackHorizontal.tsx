import React from 'react';
import Show from '../components/Show';
import BarStackHorizontal from '../docs-v2/examples/vx-barstack-horizontal/Example';
import BarStackHorizontalSource from '!!raw-loader!../docs-v2/examples/vx-barstack-horizontal/Example';

export default () => {
  return (
    <Show
      events
      margin={{
        top: 80,
        left: 80,
        right: 40,
        bottom: 100,
      }}
      component={BarStackHorizontal}
      title="Bar Stack Horizontal"
      codeSandboxDirectoryName="vx-barstack-horizontal"
    >
      {BarStackHorizontalSource}
    </Show>
  );
};
