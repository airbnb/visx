import React from 'react';
import Chord, { ChordProps } from '../../sandboxes/vx-chord/Example';
import GalleryTile from '../GalleryTile';

const tileStyles = { background: '#e4e3d8' };
const detailsStyles = { color: '#111' };

export default function ThresholdTile() {
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
