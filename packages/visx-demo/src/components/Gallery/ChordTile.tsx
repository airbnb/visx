import React from 'react';
import type { ChordProps } from '../../sandboxes/visx-chord/Example';
import Chord from '../../sandboxes/visx-chord/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../sandboxes/visx-chord/package.json';

const tileStyles = { background: '#e4e3d8' };
const detailsStyles = { color: '#111' };

export default function ChordTile() {
  return (
    <GalleryTile<ChordProps>
      title="Chord"
      description="<Chord.Chord /> & <Chord.Ribbon />"
      exampleRenderer={Chord}
      exampleUrl="/chord"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
