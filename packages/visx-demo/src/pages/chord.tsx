import React from 'react';
import Chord from '../sandboxes/visx-chord/Example';
import packageJson from '../sandboxes/visx-chord/package.json';
import Show from '../components/Show';
import ChordSource from '!!raw-loader!../sandboxes/visx-chord/Example';

function ChordPage() {
  return (
    <Show
      component={Chord}
      title="Chords"
      codeSandboxDirectoryName="visx-chord"
      packageJson={packageJson}
    >
      {ChordSource}
    </Show>
  );
}
export default ChordPage;
