import React from 'react';
import Markdown from 'react-markdown/with-html';

import Page from '../../components/Page';
import Footer from '../../components/Footer';
import ApiTable, { DocGenInfo } from '../../components/ApiTable';
import AxisReadme from '!!raw-loader!../../../../vx-axis/Readme.md';
import Axis from '../../../../vx-axis/src/axis/Axis';
import AxisBottom from '../../../../vx-axis/src/axis/AxisBottom';
import AxisLeft from '../../../../vx-axis/src/axis/AxisLeft';
import AxisRight from '../../../../vx-axis/src/axis/AxisRight';
import AxisTop from '../../../../vx-axis/src/axis/AxisTop';
import DocPage from '../../components/DocPage';

const components = [
  // @ts-ignore
  Axis.__docgenInfo,
  // @ts-ignore
  AxisBottom.__docgenInfo,
  // @ts-ignore
  AxisLeft.__docgenInfo,
  // @ts-ignore
  AxisRight.__docgenInfo,
  // @ts-ignore
  AxisTop.__docgenInfo,
] as DocGenInfo[];

export default () => (
  <Page title="@vx/axis documentation">
    <DocPage currentPackage="axis">
      <Markdown escapeHtml={false} source={AxisReadme} />
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
