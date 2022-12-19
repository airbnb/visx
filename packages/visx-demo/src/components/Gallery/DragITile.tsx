import React from 'react';
import DragI, { DragIProps } from '@visx/demo-drag-i/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '@visx/demo-drag-i/package.json';

const tileStyles = { background: '#c4c3cb', borderRadius: 14 };
const detailsStyles = { color: '#6437d6', zIndex: 1 };

export default function DragITile() {
  return (
    <GalleryTile<DragIProps>
      title="Drag i"
      description="<Drag.Drag />>"
      exampleRenderer={DragI}
      exampleUrl="/drag-i"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
