import React from 'react';
import Show from '../components/show';
import LineRadial from '../components/tiles/lineradial';

export default () => {
  return (
    <Show component={LineRadial} title="Line Radial">
{`import React from 'react';
import { Group } from '@vx/group';
import { LineRadial } from '@vx/shape';
import { scaleLinear } from '@vx/scale';
import { curveBasisClosed } from '@vx/curve';

const data = [
  -100, -60, 0,
  60, 120, 145,
  180, 230, 270,
  310, 350, 390
];

export default function LineRadialTile({
  width,
  height,
  margin = {
    top: 10,
    left: 10,
    right: 10,
    bottom: 120,
  }
}) {
  const radius = Math.min(width, height) / 2;
  return (
    <svg width={width} height={height}>
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill="#744cca"
        rx={14}
      />
      <Group top={width / 2} left={height / 2}>
        <LineRadial
          data={data}
          angle={d => d * (Math.PI / 180)}
          radius={(d,i) => 60 + i * 20}
          fill="none"
          stroke={"#761ae3"}
          strokeWidth={6}
          curve={curveBasisClosed}
        />
        <LineRadial
          data={data}
          angle={d => d * (Math.PI / 180)}
          radius={(d,i) => 60 + i * 10}
          fill="none"
          stroke={"#dff84d"}
          strokeWidth={3}
          curve={curveBasisClosed}
        />
        <LineRadial
          data={data}
          angle={d => d * (Math.PI / 90)}
          radius={(d,i) => 60 + i * 40}
          fill="none"
          stroke={"#aeeef8"}
          strokeWidth={8}
          curve={curveBasisClosed}
        />
        <LineRadial
          data={data}
          angle={d => d * (Math.PI / 90)}
          radius={(d,i) => 120 + i * 80}
          fill="none"
          stroke={"#dff84d"}
          strokeWidth={8}
          curve={curveBasisClosed}
        />
      </Group>
    </svg>
  );
}`}
    </Show>
  );
}
