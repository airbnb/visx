import React from 'react';
import Show from '../components/Show';
import BarStack from '../sandboxes/vx-barstack/Example';
import BarStackSource from '!!raw-loader!../sandboxes/vx-barstack/Example';
import packageJson from '../sandboxes/vx-barstack/package.json';

export default () => (
  <Show
    events
    margin={{ top: 80, right: 0, bottom: 0, left: 0 }}
    component={BarStack}
    title="Bar Stack"
    codeSandboxDirectoryName="vx-barstack"
    packageJson={packageJson}
  >
    {BarStackSource}
  </Show>
);
