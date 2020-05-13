import React from 'react';
import Markdown from 'react-markdown/with-html';

import Page from '../../components/Page';
import Footer from '../../components/Footer';
import BoundsReadme from '!!raw-loader!../../../../vx-bounds/Readme.md';
import DocPage from '../../components/DocPage';

export default () => (
  <Page title="@vx/bounds documentation">
    <DocPage currentPackage="bounds">
      <Markdown escapeHtml={false} source={BoundsReadme} />
    </DocPage>
    <Footer />
  </Page>
);
