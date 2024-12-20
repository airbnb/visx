import React from 'react';
import type { TooltipProps } from '../../sandboxes/visx-tooltip/Example';
import Tooltip from '../../sandboxes/visx-tooltip/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../sandboxes/visx-tooltip/package.json';

const exampleProps = { showControls: false };
const detailsStyles = {
  background: 'white',
  color: 'rgba(53,71,125,1)',
};

export default function DotsTile() {
  return (
    <GalleryTile<TooltipProps>
      title="Tooltip"
      description="<Tooltip /> + <Portal />"
      exampleProps={exampleProps}
      exampleRenderer={Tooltip}
      exampleUrl="/tooltip"
      detailsStyles={detailsStyles}
      detailsHeight={0}
    />
  );
}
