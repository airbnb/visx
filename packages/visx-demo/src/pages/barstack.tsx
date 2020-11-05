import React from 'react';
import Show from '../components/Show';
import BarStack from '../sandboxes/visx-barstack/Example';
import BarStackSource from '!!raw-loader!../sandboxes/visx-barstack/Example';
import packageJson from '../sandboxes/visx-barstack/package.json';

const BarStackPage = () => (
  <Show
    events
    margin={{ top: 80, right: 0, bottom: 0, left: 0 }}
    component={BarStack}
    title="Bar Stack"
    codeSandboxDirectoryName="visx-barstack"
    packageJson={packageJson}
  >
    {BarStackSource}
  </Show>
);
export default BarStackPage;
