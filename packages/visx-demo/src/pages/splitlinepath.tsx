import React from 'react';
import Show from '../components/Show';
import SplitLinePath from '../sandboxes/visx-shape-splitlinepath/Example';
import StatsPlotSource from '!!raw-loader!../sandboxes/visx-shape-splitlinepath/Example';
import packageJson from '../sandboxes/visx-shape-splitlinepath/package.json';

export default () => (
  <Show
    events
    component={SplitLinePath}
    title="SplitLinePath"
    codeSandboxDirectoryName="visx-shape-splitlinepath"
    packageJson={packageJson}
  >
    {StatsPlotSource}
  </Show>
);
