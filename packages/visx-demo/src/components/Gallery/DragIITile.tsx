import React from 'react';
import type { DragIIProps } from '../../sandboxes/visx-drag-ii/Example';
import DragII from '../../sandboxes/visx-drag-ii/Example';
import GalleryTile from '../GalleryTile';
import drawData from '../util/drawData';

export { default as packageJson } from '../../sandboxes/visx-drag-ii/package.json';

const tileStyles = { background: '#04002b', borderRadius: 14 };
const detailsStyles = { color: '#ff614e', zIndex: 1 };
const exampleProps = { data: drawData };

export default function DragIITile() {
  return (
    <GalleryTile<DragIIProps>
      title="Drag ii"
      description="<Drag.Drag />"
      exampleProps={exampleProps}
      exampleRenderer={DragII}
      exampleUrl="/drag-ii"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
