import React from 'react';
import Show from '../components/Show';
import Chord from '../docs-v2/examples/vx-chord/Example';
import ChordSource from '!!raw-loader!../docs-v2/examples/vx-chord/Example';

export default () => {
  return (
    <Show component={Chord} title="Chords" codeSandboxDirectoryName="vx-chord">
      {ChordSource}
    </Show>
  );
};
