import React from 'react';
import Show from '../components/Show';
import Responsive from '../sandboxes/vx-responsive/Example';
import ResponsiveSource from '!!raw-loader!../sandboxes/vx-responsive/Example';

export default () => {
  return (
    <Show component={Responsive} title="Responsive" codeSandboxDirectoryName="vx-responsive">
      {ResponsiveSource}
    </Show>
  );
};
