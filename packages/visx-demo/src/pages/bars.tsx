import React from 'react';
import Show from '../components/Show';
import Bars from '../sandboxes/visx-bars/Example';
import BarsSource from '!!raw-loader!../sandboxes/visx-bars/Example';
import packageJson from '../sandboxes/visx-bars/package.json';

const BarsPage = () => (
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
export default BarsPage;
