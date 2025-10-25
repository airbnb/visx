import React from 'react';
import type { AxisProps } from '../../sandboxes/visx-axis/Example';
import Axis, { backgroundColor, labelColor } from '../../sandboxes/visx-axis/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../sandboxes/visx-axis/package.json';

const tileStyles = { backgroundColor };
const detailsStyles = { color: labelColor };
const exampleProps = { showControls: false };

export default function AxisTile() {
  return (
    <GalleryTile<AxisProps>
      title="Axes & scales"
      description="<Axis.AxisBottom />"
      detailsStyles={detailsStyles}
      detailsHeight={20}
      exampleProps={exampleProps}
      exampleRenderer={Axis}
      exampleUrl="/axis"
      tileStyles={tileStyles}
    />
  );
}
