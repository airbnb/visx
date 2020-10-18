import React from 'react';
import Page from '../components/Page';
import Gallery from '../components/Gallery';

const GalleryPage = () => (
  <Page wrapper={false} title="gallery">
    <Gallery />
  </Page>
);

export default GalleryPage;
