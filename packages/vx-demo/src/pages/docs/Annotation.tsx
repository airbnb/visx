import React from 'react';
import Markdown from 'react-markdown/with-html';

import Page from '../../components/Page';
import Footer from '../../components/Footer';
import ApiTable, { DocGenInfo } from '../../components/ApiTable';
import AnnotationReadme from '!!raw-loader!../../../../vx-annotation/Readme.md';
import LinePathAnnotation from '../../../../vx-annotation/src/annotations/LinePathAnnotation';
import DocPage from '../../components/DocPage';

const components = [
  // @ts-ignore
  LinePathAnnotation.__docgenInfo,
] as DocGenInfo[];

export default () => (
  <Page title="@vx/annotation documentation">
    <DocPage currentPackage="annotation">
      <Markdown escapeHtml={false} source={AnnotationReadme} />
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
