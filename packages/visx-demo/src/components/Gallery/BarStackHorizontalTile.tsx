import React from 'react';
import BarStackHorizontal, {
  HorizontalBarStackExampleProps,
  background,
  purple3,
} from '../../sandboxes/visx-barstack-horizontal/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../sandboxes/visx-barstack-horizontal/package.json';

const tileStyles = { background };
const detailsStyles = { color: purple3, zIndex: 1 };

export default function BarStackHorizontalTile() {
  return (
    <GalleryTile<HorizontalBarStackExampleProps>
      title="Bar Stack Horizontal"
      description="<Shape.BarStackHorizontal />"
      detailsStyles={detailsStyles}
      exampleRenderer={BarStackHorizontal}
      exampleUrl="/barstackhorizontal"
      tileStyles={tileStyles}
    />
  );
}
