import React from 'react';
import Markdown from 'react-markdown/with-html';

import Page from '../../components/Page';
import Footer from '../../components/Footer';
import ApiTable from '../../components/ApiTable';
import AxisReadme from '!!raw-loader!../../../../vx-axis/Readme.md';
import Axis from '../../../../vx-axis/src/axis/Axis';
import AxisBottom from '../../../../vx-axis/src/axis/AxisBottom';
import AxisLeft from '../../../../vx-axis/src/axis/AxisLeft';
import AxisRight from '../../../../vx-axis/src/axis/AxisRight';
import AxisTop from '../../../../vx-axis/src/axis/AxisTop';
import DocNav from '../../components/DocPage';

export default () => (
  <Page title="@vx/axis documentation">
    <DocNav currentPackage="axis">
      <Markdown escapeHtml={false} source={AxisReadme} />
      <h2>Components</h2>
      <ul>
        <li>
          <a href={`#Axis`}>
            <code>&lt;Axis /&gt;</code>
          </a>
        </li>
        <li>
          <a href={`#AxisBottom`}>
            <code>&lt;AxisBottom /&gt;</code>
          </a>
        </li>
        <li>
          <a href={`#AxisLeft`}>
            <code>&lt;AxisLeft /&gt;</code>
          </a>
        </li>
        <li>
          <a href={`#AxisRight`}>
            <code>&lt;AxisRight /&gt;</code>
          </a>
        </li>
        <li>
          <a href={`#AxisTop`}>
            <code>&lt;AxisTop /&gt;</code>
          </a>
        </li>
      </ul>

      <ApiTable anchorId="Axis" docgenInfo={Axis.__docgenInfo} />
      <ApiTable anchorId="AxisBottom" docgenInfo={AxisBottom.__docgenInfo} />
      <ApiTable anchorId="AxisLeft" docgenInfo={AxisLeft.__docgenInfo} />
      <ApiTable anchorId="AxisRight" docgenInfo={AxisRight.__docgenInfo} />
      <ApiTable anchorId="AxisTop" docgenInfo={AxisTop.__docgenInfo} />
    </DocNav>
    <Footer />
  </Page>
);
