/* eslint jsx-a11y/anchor-has-content: 'off' */
import React from 'react';
import Page from '../components/page';
import Footer from '../components/footer';

export default () => (
  <Page title="documentation">
    <div className="page-left">
      <div className="comingsoon">
        <h1>
          <a name="packages" />
          Packages
        </h1>
      </div>
      <ul>
        <li>
          <a href="/static/docs/vx-annotation.html"> @vx/annotation </a>
        </li>
        <li>
          <a href="/static/docs/vx-axis.html"> @vx/axis </a>
        </li>
        <li>
          <a href="/static/docs/vx-bounds.html"> @vx/bounds </a>
        </li>
        <li>
          <a href="/static/docs/vx-boxplot.html"> @vx/boxplot </a>
        </li>
        <li>
          <a href="/static/docs/vx-brush.html"> @vx/brush </a>
        </li>
        <li>
          <a href="/static/docs/vx-chord.html"> @vx/chord </a>
        </li>
        <li>
          <a href="/static/docs/vx-clip-path.html"> @vx/clip-path </a>
        </li>
        <li>
          <a href="/static/docs/vx-curve.html"> @vx/curve </a>
        </li>
        <li>
          <a href="/static/docs/vx-drag.html"> @vx/drag </a>
        </li>
        <li>
          <a href="/static/docs/vx-glyph.html"> @vx/glyph </a>
        </li>
        <li>
          <a href="/static/docs/vx-geo.html"> @vx/geo </a>
        </li>
        <li>
          <a href="/static/docs/vx-gradient.html"> @vx/gradient </a>
        </li>
        <li>
          <a href="/static/docs/vx-grid.html"> @vx/grid </a>
        </li>
        <li>
          <a href="/static/docs/vx-group.html"> @vx/group </a>
        </li>
        <li>
          <a href="/static/docs/vx-heatmap.html"> @vx/heatmap </a>
        </li>
        <li>
          <a href="/static/docs/vx-hierarchy.html"> @vx/hierarchy </a>
        </li>
        <li>
          <a href="/static/docs/vx-legend.html"> @vx/legend </a>
        </li>
        <li>
          <a href="/static/docs/vx-marker.html"> @vx/marker </a>
        </li>
        <li>
          <a href="/static/docs/vx-mock-data.html"> @vx/mock-data </a>
        </li>
        <li>
          <a href="/static/docs/vx-network.html"> @vx/network </a>
        </li>
        <li>
          <a href="/static/docs/vx-pattern.html"> @vx/pattern </a>
        </li>
        <li>
          <a href="/static/docs/vx-point.html"> @vx/point </a>
        </li>
        <li>
          <a href="/static/docs/vx-responsive.html"> @vx/responsive </a>
        </li>
        <li>
          <a href="/static/docs/vx-scale.html"> @vx/scale </a>
        </li>
        <li>
          <a href="/static/docs/vx-shape.html"> @vx/shape </a>
        </li>
        <li>
          <a href="/static/docs/vx-stats.html"> @vx/stats </a>
        </li>
        <li>
          <a href="/static/docs/vx-text.html"> @vx/text </a>
        </li>
        <li>
          <a href="/static/docs/vx-threshold.html"> @vx/threshold </a>
        </li>
        <li>
          <a href="/static/docs/vx-tooltip.html"> @vx/tooltip </a>
        </li>
        <li>
          <a href="/static/docs/vx-voronoi.html"> @vx/voronoi </a>
        </li>
        <li>
          <a href="/static/docs/vx-zoom.html"> @vx/zoom </a>
        </li>
      </ul>

      <Footer />
    </div>

    <style jsx>{`
      .page-left {
        margin-top: 55px;
      }
      .page-left > ul {
        column-count: 4;
        column-gap: 2em;
        padding: 0;
      }
      .page-left > ul > li {
        background-color: #f8f8f8;
        padding: 0.5em;
        display: inline-block;
        margin: 0 0 1em;
        width: 100%;
      }
      .page-left li {
        color: #fc2e1c;
      }
      li ul {
        margin-top: 3px;
        margin-bottom: 3px;
        margin-left: 6px;
        padding-left: 1rem;
        font-size: 14px;
        display: block;
      }

      li ul li {
        color: #000;
        font-weight: 400;
      }

      strong {
        font-weight: 600;
        opacity: 0.4;
      }

      @media (max-width: 600px) {
        .page-left > ul {
          column-count: 1;
          margin: 0 auto;
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
