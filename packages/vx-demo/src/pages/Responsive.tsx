import React from 'react';
import Show from '../components/Show';
import Responsive from '../docs-v2/examples/vx-responsive/Example';
import ResponsiveSource from '!!raw-loader!../docs-v2/examples/vx-responsive/Example';

export default () => {
  return (
    <Show component={Responsive} title="Responsive">
      {ResponsiveSource}
    </Show>
  );
};
