import React from 'react';
import Show from '../components/Show';
import BarStackHorizontal from '../sandboxes/vx-barstack-horizontal/Example';
import BarStackHorizontalSource from '!!raw-loader!../sandboxes/vx-barstack-horizontal/Example';
import packageJson from '../sandboxes/vx-barstack-horizontal/package.json';

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
      packageJson={packageJson}
    >
      {BarStackHorizontalSource}
    </Show>
  );
};
