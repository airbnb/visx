import React from 'react';
import SplitLinePathExample, {
  SplitLinePathExampleProps,
  backgroundLight,
} from '@visx/demo-shape-splitlinepath/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '@visx/demo-shape-splitlinepath/package.json';

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
