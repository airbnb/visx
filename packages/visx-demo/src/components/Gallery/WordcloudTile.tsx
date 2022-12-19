import React from 'react';
import Wordcloud from '@visx/demo-wordcloud/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '@visx/demo-wordcloud/package.json';

const tileStyles = { background: '#e4e3d8' };
const detailsStyles = { color: '#111' };

export default function WordcloudTile() {
  return (
    <GalleryTile
      title="Wordcloud"
      description="<Wordcloud />"
      exampleRenderer={(size) => <Wordcloud width={size.width} height={size.height} />}
      exampleUrl="/wordcloud"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
      detailsHeight={0}
    />
  );
}
