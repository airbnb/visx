import React from 'react';
import Patterns, { PatternProps } from '../../sandboxes/vx-pattern/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../sandboxes/vx-pattern/package.json';

const tileStyles = { background: '#f5f2e3' };
const detailsStyles = { color: '#333' };

export default function PatternsTile() {
  return (
    <GalleryTile<PatternProps>
      title="Patterns"
      description="<Pattern />"
      exampleRenderer={Patterns}
      exampleUrl="/patterns"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
