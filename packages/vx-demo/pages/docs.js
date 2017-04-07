import React from 'react';
import Page from '../components/page';
import Footer from '../components/footer';

export default () => (
  <Page title="documentation">
    <div className="page-left">
      <div className="comingsoon">
        <h2><a name="packages" />Packages</h2>
        <code>// TODO: write docs</code>
      </div>
      <ul>
        <li>
          @vx/annotation
          <ul>
            <li>LinePath</li>
          </ul>
        </li>
        <li>
          @vx/axis
          <ul>
            <li>
              <strong>/axis</strong>
              <ul>
                <li>Axis</li>
                <li>AxisBottom</li>
                <li>AxisLeft</li>
                <li>AxisRight</li>
                <li>AxisTop</li>
              </ul>
            </li>
            <li>
              <strong>/constants</strong>
              <ul>
                <li>orientation</li>
              </ul>
            </li>
            <li>
              <strong>/utils</strong>
              <ul>
                <li>center</li>
                <li>identity</li>
                <li>isHorizontal</li>
                <li>isLeft</li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          @vx/curve
          <ul>
            <li>basis</li>
            <li>basisClose</li>
            <li>basisOpen</li>
            <li>step</li>
            <li>stepAfter</li>
            <li>stepBefore</li>
            <li>bundle</li>
            <li>linear</li>
            <li>linearClosed</li>
            <li>monotoneX</li>
            <li>monotoneY</li>
            <li>cardinal</li>
            <li>cardinalClosed</li>
            <li>cardinalOpen</li>
            <li>catmullRom</li>
            <li>catmullRomClosed</li>
            <li>catmullRomOpen</li>
            <li>natural</li>
          </ul>
        </li>
        <li>
          @vx/glyph
          <ul>
            <li>Dot</li>
            <li>Glyph</li>
          </ul>
        </li>
        <li>
          @vx/grid
          <ul>
            <li>Grid</li>
            <li>Columns</li>
            <li>Rows</li>
          </ul>
        </li>
        <li>
          @vx/group
          <ul>
            <li>Group</li>
          </ul>
        </li>
        <li>
          @vx/marker
          <ul>
            <li>Marker</li>
          </ul>
        </li>
        <li>
          @vx/mock-data
          <ul>
            <li>
              <strong>/generators</strong>
              <ul>
                <li>genDateValue</li>
              </ul>
            </li>
            <li>
              <strong>/mocks</strong>
              <ul>
                <li>appleStock</li>
                <li>browserUsage</li>
                <li>groupDateValue</li>
                <li>letterFrequency</li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          @vx/pattern
          <ul>
            <li>Circles</li>
            <li>Hexagons</li>
            <li>Lines</li>
            <li>Path</li>
            <li>Pattern</li>
            <li>Waves</li>
          </ul>
        </li>
        <li>
          @vx/point
          <ul>
            <li>Point</li>
          </ul>
        </li>
        <li>
          @vx/responsive
          <ul>
            <li>
              <strong>/components</strong>
              <ul>
                <li>ScaleSVG</li>
              </ul>
            </li>
            <li>
              <strong>/enhancers</strong>
              <ul>
                <li>withScreenSize</li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          @vx/scale
          <ul>
            <li>scaleBand</li>
            <li>scalePoint</li>
            <li>scaleLinear</li>
            <li>scaleTime</li>
            <li>scaleLog</li>
            <li>scalePower</li>
          </ul>
        </li>
        <li>
          @vx/shape
          <ul>
            <li>AreaClosed</li>
            <li>AreaStack</li>
            <li>Bar</li>
            <li>Line</li>
            <li>LinePath</li>
          </ul>
        </li>
        <li>
          @vx/text
          <ul>
            <li>TextBackground</li>
            <li>TextOutline</li>
            <li>TextWrap</li>
          </ul>
        </li>
      </ul>

      <Footer />
    </div>

    <div className="page-right" />

    <style jsx>{`
      .page-left > ul {
        column-count: 4;
        column-gap: 2em;
        padding: 0;
      }
      .page-left > ul > li {
        background-color: #f8f8f8;
        padding: .5em;
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
        .page-left {
          margin-top: 10px;
        }
        .page-left > ul {
          column-count: 1;
          margin: 0 auto;
        }
        .page-right { flex: 1; padding: 1rem; }

      }
    `}</style>
  </Page>
)
