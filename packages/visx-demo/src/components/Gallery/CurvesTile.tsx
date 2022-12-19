import React from 'react';
import Curve, { CurveProps } from '@visx/demo-curve/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '@visx/demo-curve/package.json';

const tileStyles = { border: '1px solid lightgray' };
const detailsStyles = { color: '#222' };
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
