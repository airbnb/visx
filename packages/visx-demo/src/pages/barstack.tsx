import React from 'react';
import BarStack from '@visx/demo-barstack/Example';
import packageJson from '@visx/demo-barstack/package.json';
import Show from '../components/Show';
import BarStackSource from '!!raw-loader!../sandboxes/visx-barstack/Example';

function BarStackPage() {
  return (
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
}
export default BarStackPage;
