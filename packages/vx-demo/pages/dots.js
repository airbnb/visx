import React from 'react';
import Show from '../components/show';
import Dots from '../components/tiles/dots';

export default () => {
  return (
    <Show component={Dots} title="Dots">
{`import React from 'react';
import Scale from '@vx/scale';
import Group from '@vx/group';
import Gradient from '@vx/gradient';
import Mock from '@vx/mock-data';

const points = Mock.genRandomNormalPoints(600).filter((d,i) => {
  return i < 600;
});

const x = d => d[0];
const y = d => d[1];
const z = d => d[2];

export default ({
  width,
  height,
}) => {
  const xMax = width;
  const yMax = height - 80;
  if (width < 10) return null;

  const xScale = Scale.scaleLinear({
    domain: [1.3, 2.2],
    range: [0, xMax],
    clamp: true,
  });
  const yScale = Scale.scaleLinear({
    domain: [.75, 1.6],
    range: [yMax, 0],
    clamp: true,
  });

  return (
    <svg width={width} height={height}>
      <Gradient.PinkRed id="pink" />
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        rx={14}
        fill="url(#pink)"
      />
      <Group>
        {points.map((point,i) => {
          return (
            <circle
              key={\`point-\${point.x}-\${i}\`}
              fill="#f6c431"
              cx={xScale(x(point))}
              cy={yScale(y(point))}
              r={i % 3 === 0 ? 2 : 3}
            />
          );
        })}
      </Group>
    </svg>
  );
}`}
    </Show>
  );
}
