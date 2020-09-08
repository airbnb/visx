import React from 'react';
import Axis, { AxisProps, backgroundColor, labelColor } from '../../sandboxes/vx-axis/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../sandboxes/vx-axis/package.json';

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
