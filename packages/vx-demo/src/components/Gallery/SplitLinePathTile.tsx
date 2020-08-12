import React from 'react';
import SplitLinePath, { SplitLinePathProps } from '../../sandboxes/vx-shape-splitlinepath/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../sandboxes/vx-area/package.json';

export default function SplitLinePathTile() {
  return (
    <GalleryTile<SplitLinePathProps>
      title="SplitLinePath"
      description="<Shape.SplitLinePath />"
      exampleRenderer={SplitLinePath}
      exampleUrl="/splitlinepath"
    />
  );
}
