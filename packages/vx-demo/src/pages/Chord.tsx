import React from 'react';
import Show from '../components/Show';
import Chord from '../sandboxes/vx-chord/Example';
import ChordSource from '!!raw-loader!../sandboxes/vx-chord/Example';
import packageJson from '../sandboxes/vx-chord/package.json';

export default () => {
  return (
    <Show
      component={Chord}
      title="Chords"
      codeSandboxDirectoryName="vx-chord"
      packageJson={packageJson}
    >
      {ChordSource}
    </Show>
  );
};
