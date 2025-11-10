import React, { useMemo, useState } from 'react';
import { Arc } from '@visx/shape';
import { Group } from '@visx/group';
import { GradientLightgreenGreen } from '@visx/gradient';
import { scaleBand, scaleRadial } from '@visx/scale';
import { Text } from '@visx/text';
import type { LetterFrequency } from '@visx/mock-data';
import { letterFrequency } from '@visx/mock-data';

const data = letterFrequency;

const getLetter = (d: LetterFrequency) => d.letter;
const getLetterFrequency = (d: LetterFrequency) => Number(d.frequency) * 100;

const frequencySort = (a: LetterFrequency, b: LetterFrequency) => b.frequency - a.frequency;
const alphabeticalSort = (a: LetterFrequency, b: LetterFrequency) =>
  a.letter.localeCompare(b.letter);

const toRadians = (x: number) => (x * Math.PI) / 180;
const toDegrees = (x: number) => (x * 180) / Math.PI;

const barColor = '#93F9B9';
const margin = { top: 20, bottom: 20, left: 20, right: 20 };

export type RadialBarsProps = {
  width: number;
  height: number;
  showControls?: boolean;
};

export default function Example({ width, height, showControls = true }: RadialBarsProps) {
  const [rotation, setRotation] = useState(0);
  const [sortAlphabetically, setSortAlphabetically] = useState(true);

  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;
  const radiusMax = Math.min(xMax, yMax) / 2;

  const innerRadius = radiusMax / 3;

  const xDomain = useMemo(
    () => data.sort(sortAlphabetically ? alphabeticalSort : frequencySort).map(getLetter),
    [sortAlphabetically],
  );

  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0 + rotation, 2 * Math.PI + rotation],
        domain: xDomain,
        padding: 0.2,
      }),
    [rotation, xDomain],
  );

  const yScale = useMemo(
    () =>
      scaleRadial<number>({
        range: [innerRadius, radiusMax],
        domain: [0, Math.max(...data.map(getLetterFrequency))],
      }),
    [innerRadius, radiusMax],
  );

  return width < 10 ? null : (
    <>
      <svg width={width} height={height}>
        <GradientLightgreenGreen id="radial-bars-green" />
        <rect width={width} height={height} fill="url(#radial-bars-green)" rx={14} />
        <Group top={yMax / 2 + margin.top} left={xMax / 2 + margin.left}>
          {data.map((d) => {
            const letter = getLetter(d);
            const startAngle = xScale(letter);
            const midAngle = startAngle + xScale.bandwidth() / 2;
            const endAngle = startAngle + xScale.bandwidth();

            const outerRadius = yScale(getLetterFrequency(d)) ?? 0;

            // convert polar coordinates to cartesian for drawing labels
            const textRadius = outerRadius + 4;
            const textX = textRadius * Math.cos(midAngle - Math.PI / 2);
            const textY = textRadius * Math.sin(midAngle - Math.PI / 2);

            return (
              <>
                <Arc
                  key={`bar-${letter}`}
                  cornerRadius={4}
                  startAngle={startAngle}
                  endAngle={endAngle}
                  outerRadius={outerRadius}
                  innerRadius={innerRadius}
                  fill={barColor}
                />
                <Text
                  x={textX}
                  y={textY}
                  dominantBaseline="end"
                  textAnchor="middle"
                  fontSize={16}
                  fontWeight="bold"
                  fill={barColor}
                  angle={toDegrees(midAngle)}
                >
                  {letter}
                </Text>
              </>
            );
          })}
        </Group>
      </svg>
      {showControls && (
        <div className="controls">
          <label>
            <strong>Rotate</strong>&nbsp;
            <input
              type="range"
              min="0"
              max="360"
              value={toDegrees(rotation)}
              onChange={(e) => setRotation(toRadians(Number(e.target.value)))}
            />
            &nbsp;{toDegrees(rotation).toFixed(0)}°
          </label>
          <br />
          <div>
            <strong>Sort bars</strong>&nbsp;&nbsp;&nbsp;
            <label>
              <input
                type="radio"
                checked={sortAlphabetically}
                onChange={(e) => setSortAlphabetically(true)}
              />
              Alphabetically&nbsp;&nbsp;&nbsp;
            </label>
            <label>
              <input
                type="radio"
                checked={!sortAlphabetically}
                onChange={(e) => setSortAlphabetically(false)}
              />
              By frequency
            </label>
          </div>
          <br />
        </div>
      )}
      <style jsx>{`
        .controls {
          font-size: 14px;
          line-height: 1.5em;
        }
      `}</style>
    </>
  );
}
