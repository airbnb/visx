import React from 'react';
import Radar, { RadarProps, background, pumpkin } from '@visx/demo-radar/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '@visx/demo-radar/package.json';

const tileStyles = { background };
const detailsStyles = { color: pumpkin };

export default function RadarTile() {
  return (
    <GalleryTile<RadarProps>
      title="Radar"
      description="<Shape.Line /> + <Shape.LineRadial />"
      exampleRenderer={Radar}
      exampleUrl="/radar"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
