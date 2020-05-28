import React from 'react';
import ZoomI, { ZoomIProps } from '../../sandboxes/vx-zoom-i/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../sandboxes/vx-zoom-i/package.json';

const tileStyles = { background: '#0a0a0a' };
const detailsStyles = { color: '#ccc' };

export default function ZoomITile() {
  return (
    <GalleryTile<ZoomIProps>
      title="Zoom"
      description="<Zoom />"
      exampleRenderer={ZoomI}
      exampleUrl="/zoom-i"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
