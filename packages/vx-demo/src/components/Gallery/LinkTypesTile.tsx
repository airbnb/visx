import React from 'react';
import LinkTypes, { LinkTypesProps } from '../../sandboxes/vx-linktypes/Example';
import GalleryTile from '../GalleryTile';

const tileStyles = { background: '#272b4d' };
const detailsStyles = { color: '#269688' };

export default function LinkTypesTile() {
  return (
    <GalleryTile<LinkTypesProps>
      title="Link Types"
      description="<Shape.Link* />"
      exampleRenderer={LinkTypes}
      exampleUrl="/linktypes"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
