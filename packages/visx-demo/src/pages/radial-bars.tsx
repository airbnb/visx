import React from 'react';
import RadialBars from '../sandboxes/visx-radial-bars/Example';
import packageJson from '../sandboxes/visx-radial-bars/package.json';
import Show from '../components/Show';
import RadialBarsSource from '!!raw-loader!../sandboxes/visx-radial-bars/Example';

function BarsRadialPage() {
  return (
    <Show
      events
      component={RadialBars}
      title="Radial Bars"
      codeSandboxDirectoryName="visx-radial-bars"
      packageJson={packageJson}
    >
      {RadialBarsSource}
    </Show>
  );
}
export default BarsRadialPage;
