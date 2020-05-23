import React from 'react';
import Show from '../components/Show';
import Treemap from '../sandboxes/vx-treemap/Example';
import TreemapSource from '!!raw-loader!../sandboxes/vx-treemap/Example';

export default () => {
  return (
    <Show component={Treemap} title="Treemap" codeSandboxDirectoryName="vx-treemap">
      {TreemapSource}
    </Show>
  );
};
