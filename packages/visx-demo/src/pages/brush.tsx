import React from 'react';
import Show from '../components/Show';
import Brush from '../sandboxes/visx-brush/Example';
import BrushSource from '!!raw-loader!../sandboxes/visx-brush/Example';
import packageJson from '../sandboxes/visx-brush/package.json';

const BrushPage = () => (
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
export default BrushPage;
