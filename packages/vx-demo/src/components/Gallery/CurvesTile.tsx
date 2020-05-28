import React from 'react';
import Curve, { CurveProps, gradientColor1 } from '../../sandboxes/vx-curve/Example';
import GalleryTile from '../GalleryTile';

const tileStyles = { border: '1px solid lightgray' };
const detailsStyles = { color: gradientColor1 };
const exampleProps = { showControls: false };

export default function CurvesTile() {
  return (
    <GalleryTile<CurveProps>
      title="Curves"
      description="<Curve.* /> <Shape.Line />"
      exampleProps={exampleProps}
      exampleRenderer={Curve}
      exampleUrl="/curves"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
