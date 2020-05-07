import React from 'react';
import Page from '../components/Page';
import Footer from '../components/Footer';

export default () => (
  <Page title="documentation">
    <div className="page-left">
      <h1>Packages</h1>
      vx is a suite of several standalone packages to use together as needed. They can be roughly
      categorized as follows
      <h3>Chart primitives</h3>
      <ul>
        <li>
          <a href="/docs/annotation">@vx/annotation</a>
        </li>
        <li>
          <a href="/docs/axis">@vx/axis</a>
        </li>
        <li>
          <a href="/docs/curve">@vx/curve</a>
        </li>
        <li>
          <a href="/docs/glyph">@vx/glyph</a>
        </li>
        <li>
          <a href="/docs/grid">@vx/grid</a>
        </li>
        <li>
          <a href="/docs/legend">@vx/legend</a>
        </li>
        <li>
          <a href="/docs/marker">@vx/marker</a>
        </li>
        <li>
          <a href="/docs/scale">@vx/scale</a>
        </li>
        <li>
          <a href="/docs/shape">@vx/shape</a>
        </li>
        <li>
          <a href="/docs/threshold">@vx/threshold</a>
        </li>
        <li>
          <a href="/docs/tooltip">@vx/tooltip</a>
        </li>
      </ul>
      <h3>Interactions</h3>
      <ul>
        <li>
          <a href="/docs/brush">@vx/brush</a>
        </li>
        <li>
          <a href="/docs/drag">@vx/drag</a>
        </li>
        <li>
          <a href="/docs/voronoi">@vx/voronoi</a>
        </li>
        <li>
          <a href="/docs/zoom">@vx/zoom</a>
        </li>
      </ul>
      <h3>Layouts / Specialized</h3>
      <ul>
        <li>
          <a href="/docs/chord">@vx/chord</a>
        </li>
        <li>
          <a href="/docs/geo">@vx/geo</a>
        </li>
        <li>
          <a href="/docs/heatmap">@vx/heatmap</a>
        </li>
        <li>
          <a href="/docs/hierarchy">@vx/hierarchy</a>
        </li>
        <li>
          <a href="/docs/network">@vx/network</a>
        </li>
        <li>
          <a href="/docs/stats">@vx/stats</a>
        </li>
      </ul>
      <h3>SVG utilities</h3>
      <ul>
        <li>
          <a href="/docs/clip-path">@vx/clip-path</a>
        </li>
        <li>
          <a href="/docs/bounds">@vx/group</a>
        </li>
        <li>
          <a href="/docs/bounds">@vx/gradient</a>
        </li>
        <li>
          <a href="/docs/pattern">@vx/pattern</a>
        </li>
        <li>
          <a href="/docs/text">@vx/text</a>
        </li>
      </ul>
      <h3>Chart utilities</h3>
      <ul>
        <li>
          <a href="/docs/bounds">@vx/bounds</a>
        </li>
        <li>
          <a href="/docs/mock-data">@vx/mock-data</a>
        </li>
        <li>
          <a href="/docs/responsive">@vx/responsive</a>
        </li>
        <li>
          <a href="/docs/point">@vx/point</a>
        </li>
      </ul>
    </div>
    <Footer />
    <style jsx>{`
      .page-left {
        margin-top: 24px;
        margin-bottom: 40px;
      }
      .page-left > ul {
        padding: 0;
        margin-top: 0;
        margin-bottom: 0;
        display: grid;
        grid-gap: 1em 2em;
        align-items: center;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      }
      .page-left > ul > li {
        background-color: #f8f8f8;
        padding: 0.5em;
        display: block;
        width: 100%;
        overflow: ellipsis;
      }
      .page-left li {
        color: #fc2e1c;
      }
      strong {
        font-weight: 600;
        opacity: 0.4;
      }
      @media (max-width: 660px) {
        .page-left > ul {
          column-count: 1;
        }
        .page-right {
          flex: 1;
          padding: 1rem;
          margin-top: 0;
          padding: 0;
        }
      }
    `}</style>
  </Page>
);
