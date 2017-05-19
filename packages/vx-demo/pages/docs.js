import React from 'react';
import Page from '../components/page';
import Footer from '../components/footer';

export default () => (
  <Page title="documentation">
    <div className="page-left">
      <div className="comingsoon">
        <h1><a name="packages" />Packages</h1>
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
            <li>curveBasis</li>
            <li>curveBasisClose</li>
            <li>curveBasisOpen</li>
            <li>curveStep</li>
            <li>curveStepAfter</li>
            <li>curveStepBefore</li>
            <li>curveBundle</li>
            <li>curveLinear</li>
            <li>curveLinearClosed</li>
            <li>curveMonotoneX</li>
            <li>curveMonotoneY</li>
            <li>curveCardinal</li>
            <li>curveCardinalClosed</li>
            <li>curveCardinalOpen</li>
            <li>curveCatmullRom</li>
            <li>curveCatmullRomClosed</li>
            <li>curveCatmullRomOpen</li>
            <li>curveNatural</li>
          </ul>
        </li>
        <li>
          @vx/glyph
          <ul>
            <li>GlyphDot</li>
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
            <li>PatternCircles</li>
            <li>PatternHexagons</li>
            <li>PatternLines</li>
            <li>PatternPath</li>
            <li>Pattern</li>
            <li>PatternWaves</li>
            <li>PatternOrientation</li>
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
)
