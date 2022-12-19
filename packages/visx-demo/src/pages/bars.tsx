import React from 'react';
import Bars from '@visx/demo-bars/Example';
import packageJson from '@visx/demo-bars/package.json';
import Show from '../components/Show';
import BarsSource from '!!raw-loader!../sandboxes/visx-bars/Example';

function BarsPage() {
  return (
    <Show
      events
      component={Bars}
      title="Bars"
      codeSandboxDirectoryName="visx-bars"
      packageJson={packageJson}
    >
      {BarsSource}
    </Show>
  );
}
export default BarsPage;
