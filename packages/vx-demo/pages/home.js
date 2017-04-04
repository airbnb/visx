import React from 'react';
import Page from '../components/page';

export default () => (
  <Page>
    <div className="page-left">
      <h2><a name="about"></a>About</h2>
      <p>
        <code>vx</code> is collection of reusable low-level visualization components. <code>vx</code> combines the power of <code>d3</code> to generate your visualization with the benefits of <code>react</code> for updating the DOM.
      </p>
      <p><code>react + d3 = vx</code></p>
      <p><a href="https://github.com/hshoff/vx">github.com/hshoff/vx</a></p>
      <h2><a name="motivation"></a>Motivation</h2>
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
        <li><a href="https://github.com/hshoff/vx/tree/master/packages/vx-curve">@vx/curve</a></li>
        <li><a href="https://github.com/hshoff/vx/tree/master/packages/vx-demo">@vx/demo</a></li>
        <li><a href="https://github.com/hshoff/vx/tree/master/packages/vx-glyph">@vx/glyph</a></li>
        <li><a href="https://github.com/hshoff/vx/tree/master/packages/vx-grid">@vx/grid</a></li>
        <li><a href="https://github.com/hshoff/vx/tree/master/packages/vx-group">@vx/group</a></li>
        <li><a href="https://github.com/hshoff/vx/tree/master/packages/vx-marker">@vx/marker</a></li>
        <li><a href="https://github.com/hshoff/vx/tree/master/packages/vx-mock-data">@vx/mock-data</a></li>
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
    </div>
    <div className="page-right">
      <ul>
        <li><a href="#about">About</a></li>
        <li><a href="#motivation">Motivation</a></li>
        <li><a href="#status">Status</a></li>
        <li><a href="#packages">Packages</a></li>
        <li><a href="#roadmap">Roadmap</a></li>
        <li><a href="#faq">FAQ</a></li>
      </ul>
    </div>

    <style jsx>{`
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
        font-family: 'Roboto';
        color: #000;
        margin-left: 3vw;
      }

      .faq {
        margin-bottom: 10vh;
      }
    `}</style>
  </Page>
)
