import React from 'react';
import Show from '../components/Show';
import Tooltip from '../sandboxes/vx-tooltip/Example';
import TooltipSource from '!!raw-loader!../sandboxes/vx-tooltip/Example';
import packageJson from '../sandboxes/vx-tooltip/package.json';

export default () => (
  <Show
    component={Tooltip}
    title="Tooltip"
    codeSandboxDirectoryName="vx-tooltip"
    packageJson={packageJson}
  >
    {TooltipSource}
  </Show>
);
