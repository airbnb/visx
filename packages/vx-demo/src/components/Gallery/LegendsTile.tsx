import React from 'react';
import Legends from '../../sandboxes/vx-legend/Example';
import GalleryTile from '../GalleryTile';

const tileStyles = { background: 'black' };
const detailsStyles = { color: '#aaa' };

export default function LegendsTile() {
  return (
    <GalleryTile<any>
      title="Legends"
      description="<Legend />"
      exampleRenderer={Legends}
      exampleUrl="/legends"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
