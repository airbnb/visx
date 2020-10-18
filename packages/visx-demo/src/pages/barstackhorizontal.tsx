import React from 'react';
import Show from '../components/Show';
import BarStackHorizontal from '../sandboxes/visx-barstack-horizontal/Example';
import BarStackHorizontalSource from '!!raw-loader!../sandboxes/visx-barstack-horizontal/Example';
import packageJson from '../sandboxes/visx-barstack-horizontal/package.json';

const BarStackHorizontalPage = () => {
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
      codeSandboxDirectoryName="visx-barstack-horizontal"
      packageJson={packageJson}
    >
      {BarStackHorizontalSource}
    </Show>
  );
};
export default BarStackHorizontalPage;
