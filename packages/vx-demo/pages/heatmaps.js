import React from 'react';
import Show from '../components/show';
import Heatmap from '../components/tiles/heatmap';

export default () => {
  return (
    <Show
      events
      margin={{
        top: 10,
        left: 40,
        right: 30,
        bottom: 80,
      }}
      component={Heatmap}
      title="Heatmaps"
    >
{`import React from 'react';
import { Group } from '@vx/group';
import { genBins } from '@vx/mock-data';
import { scaleBand, scaleLinear } from '@vx/scale';
import { HeatmapCircle, HeatmapRect } from '@vx/heatmap';
import { extent, min, max } from 'd3-array';

const data = genBins(16, 16);

// accessors
const x = d => d.bin;
const y = d => d.bins;
const z = d => d.count;

export default ({
  width,
  height,
  events = false,
  margin = {
    top: 10,
    left: 20,
    right: 20,
    bottom: 110,
  }
}) => {
  if (width < 10) return null;

  // bounds
  const size =  width > (margin.left + margin.right)
    ? width - margin.left - margin.right
    : width;
  const xMax =  size / 2;
  const yMax = height - margin.bottom;
  const dMin = min(data, d => min(y(d), x));
  const dMax = max(data, d => max(y(d), x));
  const dStep = dMax / data[0].bins.length;
  const bWidth = xMax / data.length;
  const bHeight = yMax / data[0].bins.length;
  const colorMax = max(data, d => max(y(d), z));

  // scales
  const xScale = scaleLinear({
    range: [0, xMax],
    domain: extent(data, x)
  });
  const yScale = scaleLinear({
    range: [yMax, 0],
    domain: [dMin, dMax]
  });
  const colorScale = scaleLinear({
    range: ['#77312f', '#f33d15'],
    domain: [0, colorMax]
  });
  const colorScale2 = scaleLinear({
    range: ['#122549', '#b4fbde'],
    domain: [0, colorMax]
  });
  const opacityScale = scaleLinear({
    range: [.1, 1],
    domain: [0, colorMax]
  });

  return (
    <svg width={width} height={height}>
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        rx={14}
        fill="#28272c"
      />
      <Group top={margin.top} left={5}>
        <HeatmapCircle
          data={data}
          xScale={xScale}
          yScale={yScale}
          colorScale={colorScale}
          opacityScale={opacityScale}
          radius={(bWidth + 4) / 2}
          step={dStep}
          gap={4}
          onClick={data => event => {
            if (!events) return;
            alert(\`clicked: \${JSON.stringify(data.bin)}\`)
          }}
        />
      </Group>
      <Group top={margin.top} left={xMax + margin.left}>
        <HeatmapRect
          data={data}
          xScale={xScale}
          yScale={yScale}
          colorScale={colorScale2}
          opacityScale={opacityScale}
          binWidth={bWidth}
          binHeight={bWidth}
          step={dStep}
          gap={0}
          onClick={data => event => {
            if (!events) return;
            alert(\`clicked: \${JSON.stringify(data.bin)}\`)
          }}
        />
      </Group>
    </svg>
  );
}`}
    </Show>
  );
}
