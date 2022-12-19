import React from 'react';
import Page from '../components/Page';
import Gallery from '../components/Gallery';

function GalleryPage() {
  return (
    <Page wrapper={false} title="gallery">
      <Gallery />
    </Page>
  );
}

export default GalleryPage;
