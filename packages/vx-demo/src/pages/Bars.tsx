import React from 'react';
import Show from '../components/Show';
import Bars from '../docs-v2/examples/vx-bars/Example';
import BarsSource from '!!raw-loader!../docs-v2/examples/vx-bars/Example';

export default () => (
  <Show events component={Bars} title="Bars" codeSandboxDirectoryName="vx-bars">
    {BarsSource}
  </Show>
);
