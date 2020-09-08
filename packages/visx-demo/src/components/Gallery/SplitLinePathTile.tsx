import React from 'react';
import SplitLinePath, {
  SplitLinePathProps,
  backgroundLight,
} from '../../sandboxes/visx-shape-splitlinepath/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../sandboxes/visx-area/package.json';

const tileStyles = { background: backgroundLight };
const detailsStyles = { color: 'white' };

export default function SplitLinePathTile() {
  return (
    <GalleryTile<SplitLinePathProps>
      title="SplitLinePath"
      description="<Shape.SplitLinePath />"
      exampleRenderer={SplitLinePath}
      exampleUrl="/splitlinepath"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
      detailsHeight={0}
    />
  );
}
