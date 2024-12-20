import React from 'react';
import type { SplitLinePathExampleProps } from '../../sandboxes/visx-shape-splitlinepath/Example';
import SplitLinePathExample, {
  backgroundLight,
} from '../../sandboxes/visx-shape-splitlinepath/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../sandboxes/visx-shape-splitlinepath/package.json';

const tileStyles = { background: backgroundLight };
const detailsStyles = { color: 'white' };

export default function SplitLinePathTile() {
  return (
    <GalleryTile<SplitLinePathExampleProps>
      title="SplitLinePath"
      description="<Shape.SplitLinePath />"
      exampleRenderer={SplitLinePathExample}
      exampleUrl="/splitlinepath"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
      detailsHeight={0}
    />
  );
}
