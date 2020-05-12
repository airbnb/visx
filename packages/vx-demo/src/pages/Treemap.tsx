import React from 'react';
import Show from '../components/Show';
import Treemap from '../docs-v2/examples/vx-treemap/Example';
import TreemapSource from '!!raw-loader!../docs-v2/examples/vx-treemap/Example';

export default () => {
  return (
    <Show component={Treemap} title="Treemap" codeSandboxDirectoryName="vx-treemap">
      {TreemapSource}
    </Show>
  );
};
