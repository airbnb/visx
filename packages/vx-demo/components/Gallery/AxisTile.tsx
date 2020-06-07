import React from 'react';
import Axis, { AxisProps, backgroundColor, labelColor } from '../../sandboxes/vx-axis/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../sandboxes/vx-axis/package.json';

const tileStyles = { backgroundColor };
const detailsStyles = { color: labelColor };

export default function AxisTile() {
  return (
    <GalleryTile<AxisProps>
      title="Axes & scales"
      description="<Axis.AxisBottom />"
      detailsStyles={detailsStyles}
      exampleRenderer={Axis}
      exampleUrl="/axis"
      tileStyles={tileStyles}
    />
  );
}
