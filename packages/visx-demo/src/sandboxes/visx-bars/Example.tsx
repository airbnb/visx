import React, { useMemo } from 'react';
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { GradientTealBlue } from '@visx/gradient';
import letterFrequency, { LetterFrequency } from '@visx/mock-data/lib/mocks/letterFrequency';
import { scaleBand, scaleLinear } from '@visx/scale';

const verticalMargin = 120;

// accessors
const getLetter = (d: LetterFrequency) => d.letter;
const getLetterFrequency = (d: LetterFrequency) => Number(d.frequency) * 100;

export type BarsProps<Datum> = {
  data: readonly Datum[];
  height: number;
  width: number;
  xAccessor: (d: Datum) => string;
  yAccessor: (d: Datum) => number;

  events?: boolean;
};

function Bars<Datum>({
  width,
  height,
  events = false,
  data,
  xAccessor,
  yAccessor,
}: BarsProps<Datum>) {
  // bounds
  const xMax = width;
  const yMax = height - verticalMargin;

  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        round: true,
        domain: data.map(xAccessor),
        padding: 0.4,
      }),
    [xMax, data, xAccessor],
  );

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...data.map(yAccessor))],
      }),
    [yMax, data, yAccessor],
  );

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <GradientTealBlue id="teal" />
      <rect width={width} height={height} fill="url(#teal)" rx={14} />
      <Group top={verticalMargin / 2}>
        {data.map(d => {
          const xValue = xAccessor(d);
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - (yScale(yAccessor(d)) ?? 0);
          const barX = xScale(xValue) ?? 0;
          const barY = yMax - barHeight;
          return (
            <>
              <Bar
                key={`bar-${xValue}`}
                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill="rgba(23, 233, 217, .5)"
                onClick={() => {
                  if (events) alert(`clicked: ${JSON.stringify(Object.values(d))}`);
                }}
              />
            </>
          );
        })}
      </Group>
    </svg>
  );
}

export default function Example({
  width,
  height,
  events,
}: Pick<BarsProps<LetterFrequency>, 'width' | 'height' | 'events'>) {
  return (
    <Bars
      width={width}
      height={height}
      data={letterFrequency}
      xAccessor={getLetter}
      yAccessor={getLetterFrequency}
      events={events}
    />
  );
}
