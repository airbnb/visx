import React from 'react';
import Show from '../components/Show';
import SplitLinePath from '../sandboxes/vx-shape-splitlinepath/Example';
import StatsPlotSource from '!!raw-loader!../sandboxes/vx-shape-splitlinepath/Example';
import packageJson from '../sandboxes/vx-shape-splitlinepath/package.json';

export default () => (
  <Show
    events
    component={SplitLinePath}
    title="SplitLinePath"
    codeSandboxDirectoryName="vx-shape-splitlinepath"
    packageJson={packageJson}
  >
    {StatsPlotSource}
  </Show>
);
