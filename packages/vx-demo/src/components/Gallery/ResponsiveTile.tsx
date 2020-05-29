import React from 'react';
import Responsive, { ResponsiveProps } from '../../sandboxes/vx-responsive/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../sandboxes/vx-responsive/package.json';

const tileStyles = { background: 'white' };
const detailsStyles = {
  color: '#232323',
  zIndex: 1,
  border: '1px solid lightgray',
  borderTop: 'none',
  borderBottomLeftRadius: '14px',
  borderBottomRightRadius: '14px',
};

export default function ResponsiveTile() {
  return (
    <GalleryTile<ResponsiveProps>
      title="Responsive"
      description="<Responsive.ParentSize />"
      exampleRenderer={Responsive}
      exampleUrl="/responsive"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
