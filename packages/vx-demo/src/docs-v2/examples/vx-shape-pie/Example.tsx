import React, { useState } from 'react';
import Pie, { ProvidedProps, PieArcDatum } from '@vx/shape/lib/shapes/Pie';
import { scaleOrdinal } from '@vx/scale';
import { Group } from '@vx/group';
import { GradientPinkBlue } from '@vx/gradient';
import letterFrequency, { LetterFrequency } from '@vx/mock-data/lib/mocks/letterFrequency';
import browserUsage, { BrowserUsage as Browsers } from '@vx/mock-data/lib/mocks/browserUsage';
import { animated, useTransition, interpolate } from 'react-spring';

// data and types
type BrowserNames = keyof Browsers;

interface BrowserUsage {
  label: BrowserNames;
  usage: number;
}

const letters: LetterFrequency[] = letterFrequency.slice(0, 4);
const browserNames = Object.keys(browserUsage[0]).filter(k => k !== 'date') as BrowserNames[];
const browsers: BrowserUsage[] = browserNames.map(name => ({
  label: name,
  usage: Number(browserUsage[0][name]),
}));

// accessor functions
const usage = (d: BrowserUsage) => d.usage;
const frequency = (d: LetterFrequency) => d.frequency;

// color scales
const getBrowserColor = scaleOrdinal({
  domain: browserNames,
  range: [
    'rgba(255,255,255,0.7)',
    'rgba(255,255,255,0.6)',
    'rgba(255,255,255,0.5)',
    'rgba(255,255,255,0.4)',
    'rgba(255,255,255,0.3)',
    'rgba(255,255,255,0.2)',
    'rgba(255,255,255,0.1)',
  ],
});
const getLetterFrequencyColor = scaleOrdinal({
  domain: letters.map(l => l.letter),
  range: ['rgba(93,30,91,1)', 'rgba(93,30,91,0.8)', 'rgba(93,30,91,0.6)', 'rgba(93,30,91,0.4)'],
});

const defaultMargin = { top: 0, right: 0, bottom: 0, left: 0 };

type ExampleProps = {
  width: number;
  height: number;
  margin?: typeof defaultMargin;
  animate?: boolean;
};

export default function Example({
  width,
  height,
  margin = defaultMargin,
  animate = true,
}: ExampleProps) {
  const [selectedBrowser, setSelectedBrowser] = useState<string | null>(null);
  const [selectedAlphabetLetter, setSelectedAlphabetLetter] = useState<string | null>(null);

  if (width < 10) return null;

  const radius = Math.min(width, height) / 2;
  const centerY = height / 2;
  const centerX = width / 2;

  return (
    <svg width={width} height={height}>
      <GradientPinkBlue id="vx-pie-gradient" />
      <rect rx={14} width={width} height={height} fill="url('#vx-pie-gradient')" />
      <Group top={centerY - margin.top} left={centerX}>
        <Pie
          data={
            selectedBrowser ? browsers.filter(({ label }) => label === selectedBrowser) : browsers
          }
          pieValue={usage}
          outerRadius={radius - 80}
          innerRadius={radius - 120}
          cornerRadius={3}
          padAngle={0.005}
        >
          {pie => (
            <AnimatedPie<BrowserUsage>
              {...pie}
              animate={animate}
              getKey={arc => arc.data.label}
              onClickDatum={({ data: { label } }) =>
                animate &&
                setSelectedBrowser(selectedBrowser && selectedBrowser === label ? null : label)
              }
              getColor={arc => getBrowserColor(arc.data.label)}
            />
          )}
        </Pie>
        <Pie
          data={
            selectedAlphabetLetter
              ? letters.filter(({ letter }) => letter === selectedAlphabetLetter)
              : letters
          }
          pieValue={frequency}
          pieSortValues={() => -1}
          outerRadius={radius - 135}
        >
          {pie => (
            <AnimatedPie<LetterFrequency>
              {...pie}
              animate={animate}
              getKey={({ data: { letter } }) => letter}
              onClickDatum={({ data: { letter } }) =>
                animate &&
                setSelectedAlphabetLetter(
                  selectedAlphabetLetter && selectedAlphabetLetter === letter ? null : letter,
                )
              }
              getColor={({ data: { letter } }) => getLetterFrequencyColor(letter)}
            />
          )}
        </Pie>
      </Group>
      {animate && (
        <text
          textAnchor="end"
          x={width - 16}
          y={height - 16}
          fill="white"
          fontSize={11}
          fontWeight={300}
          pointerEvents="none"
        >
          Click segments to update
        </text>
      )}
    </svg>
  );
}

// react-spring transition definitions
type AnimatedStyles = { startAngle: number; endAngle: number; opacity: number };

const fromLeaveTransition = ({ endAngle }: PieArcDatum<any>) => ({
  // enter from 360° if end angle is > 180°
  startAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
  endAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
  opacity: 0,
});
const enterUpdateTransition = ({ startAngle, endAngle }: PieArcDatum<any>) => ({
  startAngle,
  endAngle,
  opacity: 1,
});

type AnimatedPieProps<Datum> = ProvidedProps<Datum> & {
  animate?: boolean;
  getKey: (d: PieArcDatum<Datum>) => string;
  getColor: (d: PieArcDatum<Datum>) => string;
  onClickDatum: (d: PieArcDatum<Datum>) => void;
  delay?: number;
};

function AnimatedPie<Datum>({
  animate,
  arcs,
  path,
  getKey,
  getColor,
  onClickDatum,
}: AnimatedPieProps<Datum>) {
  // @ts-ignore react-spring doesn't like this overload
  return useTransition<PieArcDatum<Datum>, AnimatedStyles>(arcs, getKey, {
    from: animate ? fromLeaveTransition : enterUpdateTransition,
    enter: enterUpdateTransition,
    update: enterUpdateTransition,
    leave: animate ? fromLeaveTransition : enterUpdateTransition,
  }).map(
    ({
      item: arc,
      props,
      key,
    }: {
      item: PieArcDatum<Datum>;
      props: AnimatedStyles;
      key: string;
    }) => {
      const [centroidX, centroidY] = path.centroid(arc);
      const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;

      return (
        <g key={key}>
          <animated.path
            // compute interpolated path d attribute from intermediate angle values
            d={interpolate([props.startAngle, props.endAngle], (startAngle, endAngle) =>
              path({
                ...arc,
                startAngle,
                endAngle,
              }),
            )}
            fill={getColor(arc)}
            onClick={() => onClickDatum(arc)}
            onTouchStart={() => onClickDatum(arc)}
          />
          {hasSpaceForLabel && (
            <animated.g style={{ opacity: props.opacity }}>
              <text
                fill="white"
                x={centroidX}
                y={centroidY}
                dy=".33em"
                fontSize={9}
                textAnchor="middle"
                pointerEvents="none"
              >
                {getKey(arc)}
              </text>
            </animated.g>
          )}
        </g>
      );
    },
  );
}
