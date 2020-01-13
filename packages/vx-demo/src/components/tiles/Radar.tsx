import React from 'react';
import { Group } from '@vx/group';
import letterFrequency, { LetterFrequency } from '@vx/mock-data/lib/mocks/letterFrequency';
import { scaleLinear } from '@vx/scale';
import { Point } from '@vx/point';
import { Line, LineRadial } from '@vx/shape';
import { ShowProvidedProps } from '../../types';

const orange = '#ff9933';
const pumpkin = '#f5810c';
const silver = '#d9d9d9';
const bg = '#FAF7E9';

const degrees = 360;
const data = letterFrequency.slice(2, 12);

const y = (d: LetterFrequency) => d.frequency;

const genAngles = (length: number) =>
  [...new Array(length + 1)].map((_, i) => ({
    angle: i * (degrees / length),
  }));

const genPoints = (length: number, radius: number) => {
  const step = (Math.PI * 2) / length;
  return [...new Array(length)].map((_, i) => ({
    x: radius * Math.sin(i * step),
    y: radius * Math.cos(i * step),
  }));
};

function genPolygonPoints<Datum>(
  dataArray: Datum[],
  scale: (n: number) => number,
  getValue: (d: Datum) => number,
) {
  const step = (Math.PI * 2) / dataArray.length;
  const points: { x: number; y: number }[] = new Array(dataArray.length).fill({ x: 0, y: 0 });
  const pointString: string = new Array(dataArray.length + 1).fill('').reduce((res, _, i) => {
    if (i > dataArray.length) return res;
    const xVal = scale(getValue(dataArray[i - 1])) * Math.sin(i * step);
    const yVal = scale(getValue(dataArray[i - 1])) * Math.cos(i * step);
    points[i - 1] = { x: xVal, y: yVal };
    res += `${xVal},${yVal} `;
    return res;
  });

  return { points, pointString };
}

export default ({
  width,
  height,
  levels = 5,
  margin = {
    top: 40,
    left: 80,
    right: 80,
    bottom: 80,
  },
}: ShowProvidedProps & { levels?: number }) => {
  if (width < 10) return null;

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;
  const radius = Math.min(xMax, yMax) / 2;

  const radiusScale = scaleLinear<number>({
    range: [0, Math.PI * 2],
    domain: [degrees, 0],
  });

  const yScale = scaleLinear<number>({
    range: [0, radius],
    domain: [0, Math.max(...data.map(y))],
  });

  const webs = genAngles(data.length);
  const points = genPoints(data.length, radius);
  const polygonPoints = genPolygonPoints(data, yScale, y);
  const zeroPoint = new Point({ x: 0, y: 0 });

  return (
    <svg width={width} height={height}>
      <rect fill={bg} width={width} height={height} rx={14} />
      <Group top={height / 2 - margin.top} left={width / 2}>
        {[...new Array(levels)].map((_, i) => {
          const r = ((i + 1) * radius) / levels;
          return (
            <LineRadial
              key={`web-${i}`}
              data={webs}
              angle={d => radiusScale(d.angle)}
              radius={r}
              fill="none"
              stroke={silver}
              strokeWidth={2}
              strokeOpacity={0.8}
              strokeLinecap="round"
            />
          );
        })}
        {[...new Array(data.length)].map((_, i) => {
          return <Line key={`radar-line-${i}`} from={zeroPoint} to={points[i]} stroke={silver} />;
        })}
        <polygon
          points={polygonPoints.pointString}
          fill={orange}
          fillOpacity={0.3}
          stroke={orange}
          strokeWidth={1}
        />
        {polygonPoints.points.map((point, i) => (
          <circle key={`radar-point-${i}`} cx={point.x} cy={point.y} r={4} fill={pumpkin} />
        ))}
      </Group>
    </svg>
  );
};
