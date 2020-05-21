import React from 'react';
import Show from '../components/Show';
import ZoomI from '../docs-v2/examples/vx-zoom-i/Example';
import ZoomISource from '!!raw-loader!../docs-v2/examples/vx-zoom-i/Example';

export default () => (
  <Show component={ZoomI} title="Zoom I" codeSandboxDirectoryName="vx-zoom-i">
    {ZoomISource}
  </Show>
);
