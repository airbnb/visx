import React from 'react';
import Wordcloud, { WordcloudProps } from '../../sandboxes/visx-wordcloud/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../sandboxes/visx-wordcloud/package.json';

const tileStyles = { background: '#e4e3d8' };
const detailsStyles = { color: '#111' };

export default function WorcloudTile() {
  return (
    <GalleryTile<WordcloudProps>
      title="Wordcloud"
      description="<Wordcloud />"
      exampleRenderer={Wordcloud}
      exampleUrl="/wordcloud"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
