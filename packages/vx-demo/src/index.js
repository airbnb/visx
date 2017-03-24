import React from 'react';
import Mock from '@vx/mock-data';
import Curve from '@vx/curve';
import SimpleLineChart from './demos/charts/SimpleLineChart';
import SimpleAreaChart from './demos/charts/SimpleAreaChart';
import SimpleLineWithGlyphsChart from './demos/charts/SimpleLineWithGlyphsChart';

export default function Demo() {
  const data1 = Mock.genDateValue(20);
  const data2 = Mock.genDateValue(20);

  const width = 800;
  const height = 400;
  const margin = {
    top: 60,
    bottom: 60,
    left: 80,
    right: 80,
  };

  return (
    <div>
      <h2>vx | <a href="https://github.com/hshoff/vx">https://github.com/hshoff/vx</a></h2>
      <p>
        A collection of reusable low-level visualization components. vx combines the power of d3 to generate your visualization and react for updating the DOM.
      </p>
      <p>Mixing two mental models for updating the DOM is never a good time. Copy and pasting d3 code into <code>componentDidMount()</code> is just that. This collection of components lets you easily build your own reusable visualization charts or library without having to learn d3. No more selections or <code>enter()/exit()/update()</code>.</p>
      <p>
        Below are some simple examples of composing vx components to make reusable charts. They're responsive too.
      </p>
      <p>
        Super beta. Hold off on using this in production until I shake out some of the bigger API problems (post v1.0.0+).
      </p>
      <p>
        <a href="https://github.com/hshoff/vx/tree/master/packages/vx-demo/src">
          view source
        </a>
      </p>
      <h4>Packages</h4>
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
      </ul>
      <h4>Demos</h4>
      <div>
        <SimpleLineChart
          width={width}
          height={height}
          margin={margin}
          dataset={[{
            data: data1,
            chart: {
              stroke: '#6A7DD3',
              strokeWidth: 4,
              backgroundColor: 'white',
            }
          }]}
        />
      </div>
      <br/>
      <div>
        <SimpleAreaChart
          width={width}
          height={height}
          margin={margin}
        />
      </div>
      <br/>
      <div>
        <SimpleLineWithGlyphsChart
          width={width}
          height={height}
          margin={margin}
          dataset={[{
            data: data2,
            chart: {
              stroke: '#b531ce',
              strokeWidth: 4,
              backgroundColor: 'white',
            }
          }]}
        />
      </div>
      <h4>Roadmap</h4>
      <p>Lots coming soon, check out the <a href="/hshoff/vx/blob/master/ROADMAP.md">roadmap</a>.</p>
      <h4>FAQ</h4>
      <ol>
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
      <p>I like using d3.</p>
      <blockquote>
      <p>Me too.</p>
      </blockquote>
      </li>
      </ol>
      <a href="https://github.com/hshoff/vx">https://github.com/hshoff/vx</a>
    </div>
  );
}
