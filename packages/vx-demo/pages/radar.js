import React from 'react';
import Show from '../components/show';
import Radar from '../components/tiles/radar';

export default () => {
  return (
    <Show component={Radar} title="Radar">
      {`import React from 'react';
import { Group } from '@vx/group';
import { letterFrequency } from '@vx/mock-data';
import { scaleLinear } from '@vx/scale';
import { Point } from '@vx/point';
import { Line, LineRadial } from '@vx/shape';
import { max, min } from 'd3-array';


const ANG = 360;

const _data = letterFrequency.slice(2, 12);
const calcAxis = (length) => {
  if (!length) return [];
  else return new Array(length + 1)
    .fill(0).map((v, i) => ({ angle: i * (ANG / length)}));
}

function calcPoints (length, radius) {
  const step = Math.PI * 2 / length;
  return new Array(length)
    .fill(0).map((v, i) => {
      return {
        x: radius * Math.sin(i * step),
        y: radius * Math.cos(i * step),
      }
    });
}

function calcCoordinates (data, scale, access) {
  const step = Math.PI * 2 / data.length;
  const points = new Array(data.length).fill({});
  const pointStr = new Array(data.length + 1)
        .fill('').reduce((res, v, i) => {
          if (i > data.length) return res;
          const x = scale(access(data[i - 1])) * Math.sin(i * step);
          const y = scale(access(data[i - 1])) * Math.cos(i * step);
          points[i - 1] = { x, y };
          return res += \`$\{x\},$\{y\} \`;
        });

  points.str = pointStr;
  return points;
}

export default ({
  width,
  height,
  events = false,
  margin = { top: 80, left: 80, right: 80, bottom: 80 },
  levels = 5,
}) => {
  if (width < 10) return null;

  const webs = calcAxis(_data.length);
  const radius = min([width, height]) / 2 - max(Object.values(margin));
  const points = calcPoints(_data.length, radius);
  const labelMargin = max(Object.values(margin)) - 20;

  const x = d => d.letter;
  const y = d => d.frequency;

  const rScale = scaleLinear({
    range: [0, Math.PI * 2],
    domain: [ANG, 0],
  });

  const yScale = scaleLinear({
    range: [0, radius],
    domain: [0, max(_data, y)],
  });

  const polyPoints = calcCoordinates(_data, yScale, y);

  return (
    <svg width={width} height={height}>
      <Group top={height / 2} left={width / 2}>
      {[...new Array(levels)].map((v, i) => (
        <LineRadial
          data={webs}
          key={i}
          angle={d => rScale(d.angle)}
          radius={(i + 1) * radius / levels}
          fill="none"
          stroke="#d9d9d9"
          strokeWidth={2}
          strokeOpacity={0.8}
          strokeLinecap="round"
        />
      ))}
      </Group>
      <Group top={height / 2} left={width / 2}>
      {[...new Array(_data.length)].map((v, i) => (
        <Line key={i}
          from={new Point({x:0, y:0})}
          to={new Point({x:points[i].x, y:points[i].y})}
          stroke="#d9d9d9"
        />
      ))}
      </Group>
      <Group top={height / 2} left={width / 2}>
        <polygon
          points={polyPoints.str}
          fill="#ff9933"
          fillOpacity="0.3"
          stroke="#ff9933"
          strokeWidth={1}
        />
      </Group>
      <Group top={height / 2} left={width / 2}>
      {polyPoints.map((v, i) => (
        <circle
          key={i}
          cx={v.x}
          cy={v.y}
          r={4}
          fill="#f5810c"
          className="dots"
        />
      ))}
      </Group>
    </svg>
  );
};
`}
    </Show>
  );
};
