import React from 'react';
import Show from '../components/Show';
import Bars from '../sandboxes/vx-bars/Example';
import BarsSource from '!!raw-loader!../sandboxes/vx-bars/Example';
import packageJson from '../sandboxes/vx-bars/package.json';

export default () => (
  <Show
    events
    component={Bars}
    title="Bars"
    codeSandboxDirectoryName="vx-bars"
    packageJson={packageJson}
  >
    {BarsSource}
  </Show>
);
