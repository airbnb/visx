import React from 'react';
import Show from '../components/Show';
import Tooltip from '../sandboxes/visx-tooltip/Example';
import TooltipSource from '!!raw-loader!../sandboxes/visx-tooltip/Example';
import packageJson from '../sandboxes/visx-tooltip/package.json';

const TooltipPage = () => (
  <Show
    component={Tooltip}
    title="Tooltip"
    codeSandboxDirectoryName="visx-tooltip"
    packageJson={packageJson}
  >
    {TooltipSource}
  </Show>
);
export default TooltipPage;
