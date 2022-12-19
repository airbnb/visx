import React from 'react';
import LinkTypes, { LinkTypesProps } from '@visx/demo-linktypes/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '@visx/demo-linktypes/package.json';

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
