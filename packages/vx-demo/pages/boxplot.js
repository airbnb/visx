import React from 'react';
import Show from '../components/show';
import BoxPlot from '../components/tiles/boxplot';

export default () => {
  return (
    <Show
      events={true}
      margin={{top: 80}}
      component={BoxPlot}
      title="Box Plot">
{`import React from 'react';
import { Group } from '@vx/group';
import { GlyphBoxPlot } from '@vx/glyph'
import { GradientTealBlue } from '@vx/gradient'
import { scaleBand, scaleLinear } from '@vx/scale';
import { extent } from 'd3-array';

const BoxPlotData = (number) => {
  const data = [];
  let i;
  for (i = 0; i < number; i += 1) {
    const points = [];
    let j;
    for (j = 0; j < 5; j += 1) {
      points.push(Math.random() * 100);
    }
    points.sort((a, b) => (a - b));
    data.push({
      x: \`Statistics $\{i\}\`,
      min: points[0],
      firstQuartile: points[1],
      median: points[2],
      thirdQuartile: points[3],
      max: points[4],
    });
  }
  return data;
};

const data = BoxPlotData(5);

// accessors
const x = d => d.x;
const min = d => d.min;
const max = d => d.max;
const median = d => d.median;
const firstQuartile = d => d.firstQuartile;
const thirdQuartile = d => d.thirdQuartile;


export default ({
  width,
  height,
  events = false,
}) => {
  if (width < 10) return null;

  // bounds
  const xMax = width;
  const yMax = height - 120;

  // scales
  const xScale = scaleBand({
    rangeRound: [0, xMax],
    domain: data.map(x),
    padding: 0.4,
  });

  const values = data.reduce((r, e) => r.push(e.min, e.max) && r, []);
  const minYValue = Math.min(...values);
  const maxYValue = Math.max(...values);
  const yDomain = [minYValue - (0.1 * Math.abs(minYValue)),
    maxYValue + (0.1 * Math.abs(minYValue))];

  const yScale = scaleLinear({
    rangeRound: [yMax, 0],
    domain: [minYValue, maxYValue]
  });

  const boxWidth = xScale.bandwidth();
  const actualyWidth = Math.min(40, boxWidth);

  return (
    <svg width={width} height={height}>
      <GradientTealBlue id="TealBlue" vertical/>
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill={\`url(#TealBlue)\`}
        rx={14}
      />
      <Group top={40}>
      {data.map((d, i) => (
        <GlyphBoxPlot
            key={i}
            min={yScale(min(d))}
            max={yScale(max(d))}
            left={xScale(x(d))}
            firstQuartile={yScale(firstQuartile(d))}
            thirdQuartile={yScale(thirdQuartile(d))}
            median={yScale(median(d))}
            boxWidth={actualyWidth}
            fill="rgba(255,255,255,0.4)"
            stroke="#FFFFFF"
            strokeWidth={2}
        />
      ))
    }
    </Group>
    </svg>
  );`}
    </Show>
  );
}
