import React from 'react';
import Tooltip from '../sandboxes/visx-tooltip/Example';
import packageJson from '../sandboxes/visx-tooltip/package.json';
import Show from '../components/Show';
import TooltipSource from '!!raw-loader!../sandboxes/visx-tooltip/Example';

function TooltipPage() {
  return (
    <Show
      component={Tooltip}
      title="Tooltip"
      codeSandboxDirectoryName="visx-tooltip"
      packageJson={packageJson}
    >
      {TooltipSource}
    </Show>
  );
}
export default TooltipPage;
