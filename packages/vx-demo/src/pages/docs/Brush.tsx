import React from 'react';
import Markdown from 'react-markdown/with-html';

import Page from '../../components/Page';
import Footer from '../../components/Footer';
import ApiTable, { DocGenInfo } from '../../components/ApiTable';
import BrushReadme from '!!raw-loader!../../../../vx-brush/Readme.md';
import Brush from '../../../../vx-brush/src/Brush';
import DocPage from '../../components/DocPage';

const components = [
  // @ts-ignore
  Brush.__docgenInfo,
] as DocGenInfo[];

export default () => (
  <Page title="@vx/brush documentation">
    <DocPage currentPackage="brush">
      <Markdown escapeHtml={false} source={BrushReadme} />
      <h2>Components</h2>
      <ul>
        {components.map(component => (
          <li key={component.displayName}>
            <a href={`#${component.displayName}`}>
              <code>&lt;{component.displayName} /&gt;</code>
            </a>
          </li>
        ))}
      </ul>

      <h2>APIs</h2>
      {components.map(component => (
        <ApiTable key={component.displayName} docgenInfo={component} />
      ))}
    </DocPage>
    <Footer />
  </Page>
);
