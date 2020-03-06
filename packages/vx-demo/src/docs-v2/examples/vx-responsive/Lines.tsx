import React from 'react';
import { Group } from '@vx/group';
import { LinePath } from '@vx/shape';
import generateDateValue, { DateValue } from '@vx/mock-data/lib/generators/genDateValue';
import { scaleTime, scaleLinear } from '@vx/scale';
import { extent, max } from 'd3-array';

const lineCount = 12;
const series = new Array(lineCount).fill(null).map(_ => generateDateValue(25));
const allData = series.reduce((rec, d) => rec.concat(d), []);

// data accessors
const getX = (d: DateValue) => d.date;
const getY = (d: DateValue) => d.value;

// scales
const xScale = scaleTime<number>({
  domain: extent(allData, getX),
});
const yScale = scaleLinear<number>({
  domain: [0, max(allData, getY)],
});

type Props = {
  width: number;
  height: number;
};

export default ({ width, height }: Props) => {
  // bounds
  const xMax = width;
  const yMax = height / lineCount;

  xScale.range([0, xMax]);
  yScale.range([yMax, 0]);

  return (
    <svg width={width} height={height}>
      {xMax > 8 &&
        series.map((lineData, i) => (
          <Group key={`lines-${i}`} top={i * yMax}>
            <LinePath<DateValue>
              data={lineData}
              x={d => xScale(getX(d))}
              y={d => yScale(getY(d))}
              stroke="#ffffff"
              strokeWidth={2}
            />
          </Group>
        ))}
    </svg>
  );
};
