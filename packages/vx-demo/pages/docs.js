import React from 'react';
import Page from '../components/page';

export default () => (
  <Page title="documentation">
    <div className="page-left">
      <div className="comingsoon">
        <h2><a name="packages" />Packages</h2>
        <code>// TODO: write docs</code>
      </div>
    </div>

    <div className="page-right">
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
            <li>band</li>
            <li>linear</li>
            <li>time</li>
          </ul>
        </li>
        <li>
          @vx/shape
          <ul>
            <li>AreaClosed</li>
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
    </div>

    <style jsx>{`
      .comingsoon {
        position: fixed;
      }
      .page-right > ul {
        display: block;
        padding-bottom: 150px;
      }
      .page-right li {
        color: #fc2e1c;
        font-weight: 600;
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
    `}</style>
  </Page>
)
