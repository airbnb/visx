import React from 'react';
import Page from '../components/page2';
import Footer from '../components/footer';
import Responsive from '@vx/responsive';
import Pattern from '@vx/pattern';
import Gradient from '@vx/gradient';
import Mock from '@vx/mock-data';
import Scale from '@vx/scale';
import Group from '@vx/group';
import Shape from '@vx/shape';
import Curve from '@vx/curve';
import Glyph from '@vx/glyph';
import { extent, max } from 'd3-array';
import LineChart from '../components/charts/SimpleLineChart';

function identity(x) {
  return x;
}

function numTicksForHeight(height) {
  if (height <= 300) return 3;
  if (300 < height && height <= 600) return 5;
  return 10;
}

function numTicksForWidth(width) {
  if (width <= 300) return 2;
  if (300 < width && width <= 400) return 5;
  return 10;
}

const dataset = [{
  data: Mock.genDateValue(20),
}, {
  data: Mock.genDateValue(20)
}]

const Background = Responsive.withScreenSize(({
  screenWidth,
  screenHeight,
}) => {
  const width = screenWidth - 40;
  const height = screenHeight;
  const margin = {
    top: 460,
    bottom: 85,
    left: 80,
    right: 80,
  };
  const allData = dataset.reduce((rec, d) => {
    return rec.concat(d.data)
  }, []);

  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // accessors
  const x = d => d.date;
  const y = d => d.value;

  // scales
  const xScale = Scale.scaleTime({
    range: [0, width],
    domain: extent(allData, x),
  });
  const yScale = Scale.scaleLinear({
    range: [yMax, 0],
    domain: [0, max(allData, y)],
    nice: true,
  });

  const yFormat = yScale.tickFormat ? yScale.tickFormat() : identity;
  const xFormat = xScale.tickFormat ? xScale.tickFormat() : identity;

  return (
    <svg className="grid" width={screenWidth - 30} height={screenHeight * .9}>
      <Pattern.Circles id="dots" width={120} height={120} fill="rgba(255,255,255,0.3)" radius={1} complement/>
      <Pattern.Circles id="dots2" width={30} height={30} fill="rgba(255,255,255,0.1)" radius={1} />
      <Gradient.LinearGradient id="fade" from={"rgba(235, 66, 37, .3)"} to={"rgba(235, 66, 37, 0)"}/>
      <Group left={20}>
      <rect fill="url('#dots')" x={0} y={0} width={screenWidth - 40} height={screenHeight} />
      <rect fill="url('#dots2')" x={0} y={0} width={screenWidth - 40} height={screenHeight} />
    </Group>

      <Group
        top={margin.top}
        left={20}
      >
        <Shape.LinePath
          data={dataset[1].data}
          xScale={xScale}
          yScale={yScale}
          x={x}
          y={y}
          stroke={"rgba(255,255,255,0.2)"}
          strokeWidth={2}
          strokeDasharray={'3,3'}
          curve={Curve.monotoneX}
          glyph={(d, i) => {
            return (
              <Glyph.Dot key={`line-point-${i}`}
                className={'vx-linepath-point'}
                cx={xScale(x(d))}
                cy={yScale(y(d))}
                r={4}
                fill={'transparent'}
                stroke={'rgba(255,255,255,0.6)'}
                strokeWidth={2}
              />
            );
          }}
        />
        <Shape.AreaClosed
          data={dataset[0].data}
          xScale={xScale}
          yScale={yScale}
          x={x}
          y={y}
          strokeWidth={2}
          stroke={"url('#fade')"}
          fill={"url('#fade')"}
          curve={Curve.monotoneX}
          fillOpacity={0.1}
        />
      </Group>
      <style jsx>{`
        .grid {
          position: absolute;
          z-index: 1;
        }
      `}</style>
    </svg>
  );
})

export default () => (
  <Page>
    <div className="hero">
      <Background />
      <div className="hero-logo" />
      <h1>react + d3 = vx</h1>
      <a className="button" href="https://github.com/hshoff/vx">View on Github</a>
    </div>
    <div className="page-left">
      <h2><a name="about"></a>About</h2>
      <p>
        <code>vx</code> is collection of reusable low-level visualization components. <code>vx</code> combines the power of <code>d3</code> to generate your visualization with the benefits of <code>react</code> for updating the DOM.
      </p>
      <p><code>react + d3 = vx</code></p>
      <p><a href="https://github.com/hshoff/vx">github.com/hshoff/vx</a></p>
      <h2><a name="motivation"></a>Motivation</h2>
      <div><strong>Goal</strong></div>
      <p>The goal is to create a library of components you can use to make both your own resuable chart library or your slick custom one-off chart. <code>vx</code> is largely unopinionated and is meant to be build on top of. Keep your bundle sizes down and use only the packages you need.</p>
      <div><strong>How?</strong></div>
      <p>Under the hood, <code>vx</code> is using <code>d3</code> for the calculations and math. If you're creating your own awesome chart library ontop of <code>vx</code>, it's easy to create a component api that hides <code>d3</code> entirely. Meaning your team could create charts as easily as using reusable react components.</p>
      <div><strong>But why?</strong></div>
      <p>Mixing two mental models for updating the DOM is never a good time. Copy and pasting d3 code into <code>componentDidMount()</code> is just that. This collection of components lets you easily build your own reusable visualization charts or library without having to learn d3. No more selections or <code>enter()</code>/<code>exit()</code>/<code>update()</code>.</p>
      <h2><a name="status"></a>Status</h2>
      <p>
        <code>Super beta</code> Hold off on using this in production until I shake out some of the bigger API problems (post v1.0.0+).
      </p>
      <p>
        If you're a curious coder, feel free to install and play around with the packages. I recommend using <code>--save-exact</code> when you <code>npm install</code>.
      </p>
      <h2><a name="packages"></a>Packages</h2>
      <ul>
        <li><a href="https://github.com/hshoff/vx/tree/master/packages/vx-annotation">@vx/annotation</a></li>
        <li><a href="https://github.com/hshoff/vx/tree/master/packages/vx-axis">@vx/axis</a></li>
        <li><a href="https://github.com/hshoff/vx/tree/master/packages/vx-brush">@vx/brush</a></li>
        <li><a href="https://github.com/hshoff/vx/tree/master/packages/vx-curve">@vx/curve</a></li>
        <li><a href="https://github.com/hshoff/vx/tree/master/packages/vx-demo">@vx/demo</a></li>
        <li><a href="https://github.com/hshoff/vx/tree/master/packages/vx-glyph">@vx/glyph</a></li>
        <li><a href="https://github.com/hshoff/vx/tree/master/packages/vx-gradient">@vx/gradient</a></li>
        <li><a href="https://github.com/hshoff/vx/tree/master/packages/vx-grid">@vx/grid</a></li>
        <li><a href="https://github.com/hshoff/vx/tree/master/packages/vx-group">@vx/group</a></li>
        <li><a href="https://github.com/hshoff/vx/tree/master/packages/vx-marker">@vx/marker</a></li>
        <li><a href="https://github.com/hshoff/vx/tree/master/packages/vx-mock-data">@vx/mock-data</a></li>
        <li><a href="https://github.com/hshoff/vx/tree/master/packages/vx-pattern">@vx/pattern</a></li>
        <li><a href="https://github.com/hshoff/vx/tree/master/packages/vx-point">@vx/point</a></li>
        <li><a href="https://github.com/hshoff/vx/tree/master/packages/vx-responsive">@vx/responsive</a></li>
        <li><a href="https://github.com/hshoff/vx/tree/master/packages/vx-scale">@vx/scale</a></li>
        <li><a href="https://github.com/hshoff/vx/tree/master/packages/vx-shape">@vx/shape</a></li>
        <li><a href="https://github.com/hshoff/vx/tree/master/packages/vx-text">@vx/text</a></li>
      </ul>

      <h2><a name="roadmap"></a>Roadmap</h2>
      <p>Lots coming soon, check out the <a href="https://github.com/hshoff/vx/blob/master/ROADMAP.md">roadmap</a>.</p>

      <h2><a name="faq"></a>FAQ</h2>
      <ol className="faq">
        <li>
          <p>What does <code>vx</code> stand for?</p>
          <blockquote>
          <p>vx stands for visualization components.</p>
          </blockquote>
        </li>
        <li>
          <p>Do you plan on supporting animation/transitions?</p>
          <blockquote>
          <p>yup!</p>
          </blockquote>
        </li>
        <li>
          <p>Do I have to use every package to make a chart?</p>
          <blockquote>
          <p>nope! pick and choose the packages you need.</p>
          </blockquote>
        </li>
        <li>
          <p>Can I use this to create my own library of charts for my team?</p>
          <blockquote>
          <p>Please do.</p>
          </blockquote>
        </li>
        <li>
          <p>I like using <code>d3</code>.</p>
          <blockquote>
          <p>Me too.</p>
          </blockquote>
        </li>
      </ol>
      <Footer />
    </div>

    <style jsx>{`
      .hero-container {
        position: relative;
        height: 40vh;
      }
      .hero {
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        position: relative;
        z-index: 2;
      }

      .hero .button {
        border: none;
        background: white;
        padding: .4rem 1.5rem;
        border-radius: 4px;
        color: black;
        z-index: 1;
        font-size: 14px;
      }

      .grid {
        position: absolute;
      }

      .hero h1 {
        font-family: 'Roboto Mono';
        font-weight: 100;
        font-size: 14px;
      }

      .hero-logo {
        z-index: 0;
        position: relative;
        margin-top: 80px;
        background-image: url('static/logo-dark.png');
        height: 200px;
        width: 400px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
      }

      .hero button {
        z-index: 2;
        position: relative;
      }

      .page-left {
        background: white;
        color: black;
        padding: 2rem 24rem;
        margin-bottom: 0;
      }

      .page-left blockquote {
        border-left: 2px solid #efefef;
        padding: .5rem 1rem;
        color: #777;
      }

      .page-left blockquote p {
        margin: 0;
      }

      .page-right > ul {
        display: flex;
        flex-direction: column;
        flex: 1;
        position: fixed;
        font-family: 'Karla';
        color: #000;
        margin-left: 3vw;
      }

      .faq {
        margin-bottom: 10vh;
      }

      @media (max-width: 600px) {
        .hero {
          width: 100%:
        }

        .hero-logo {
          margin-top: 40px;
        }

        .page-left {
          margin-top: 10px;
          padding: 4rem 2rem;
        }

        .page-right {
          opacity: 0;
          margin-top: 0;
          padding: 0;
        }
      }
    `}</style>
  </Page>
)
