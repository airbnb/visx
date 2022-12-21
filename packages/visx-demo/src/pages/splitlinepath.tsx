import React from 'react';
import SplitLinePathExample from '../sandboxes/visx-shape-splitlinepath/Example';
import packageJson from '../sandboxes/visx-shape-splitlinepath/package.json';
import Show from '../components/Show';
import StatsPlotSource from '!!raw-loader!../sandboxes/visx-shape-splitlinepath/Example';

function SplitLinePathPage() {
  return (
    <Show
      events
      component={SplitLinePathExample}
      title="SplitLinePath"
      codeSandboxDirectoryName="visx-shape-splitlinepath"
      packageJson={packageJson}
    >
      {StatsPlotSource}
    </Show>
  );
}
export default SplitLinePathPage;
