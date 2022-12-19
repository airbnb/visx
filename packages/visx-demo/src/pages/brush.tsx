import React from 'react';
import Brush from '@visx/demo-brush/Example';
import packageJson from '@visx/demo-brush/package.json';
import Show from '../components/Show';
import BrushSource from '!!raw-loader!../sandboxes/visx-brush/Example';

function BrushPage() {
  return (
    <Show
      component={Brush}
      title="Brush"
      margin={{
        top: 40,
        left: 50,
        right: 20,
        bottom: 10,
      }}
      codeSandboxDirectoryName="visx-brush"
      packageJson={packageJson}
    >
      {BrushSource}
    </Show>
  );
}
export default BrushPage;
