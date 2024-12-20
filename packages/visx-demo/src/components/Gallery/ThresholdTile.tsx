import React from 'react';
import type { ThresholdProps } from '../../sandboxes/visx-threshold/Example';
import Threshold, { background } from '../../sandboxes/visx-threshold/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../sandboxes/visx-threshold/package.json';

const tileStyles = { background };
const detailsStyles = { color: '#111' };
const exampleProps = { margin: { top: 40, left: 40, right: 20, bottom: 30 } };

export default function ThresholdTile() {
  return (
    <GalleryTile<ThresholdProps>
      title="Area difference chart"
      description="<Threshold />"
      exampleProps={exampleProps}
      exampleRenderer={Threshold}
      exampleUrl="/threshold"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
