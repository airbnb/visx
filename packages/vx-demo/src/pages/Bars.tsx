import React from 'react';
import Show from '../components/Show';
import Bars from '../components/tiles/Bars';

export default () => {
  return (
    <Show events component={Bars} title="Bars">
      {`import React from 'react';
import { Bar } from '@vx/shape';
import { Group } from '@vx/group';
import { GradientTealBlue } from '@vx/gradient';
import letterFrequency, { LetterFrequency } from '@vx/mock-data/lib/mocks/letterFrequency';
import { scaleBand, scaleLinear } from '@vx/scale';
import { ShowProvidedProps } from '../../types';

const data = letterFrequency.slice(5);

// accessors
const getLetter = (d: LetterFrequency) => d.letter;
const getLetterFrequency = (d: LetterFrequency) => Number(d.frequency) * 100;

export default ({ width, height, events = false }: ShowProvidedProps) => {
  if (width < 10) return null;

  // bounds
  const xMax = width;
  const yMax = height - 120;

  // scales
  const xScale = scaleBand<string>({
    rangeRound: [0, xMax],
    domain: data.map(getLetter),
    padding: 0.4,
  });
  const yScale = scaleLinear<number>({
    rangeRound: [yMax, 0],
    domain: [0, Math.max(...data.map(getLetterFrequency))],
  });

  return (
    <svg width={width} height={height}>
      <GradientTealBlue id="teal" />
      <rect width={width} height={height} fill="url(#teal)" rx={14} />
      <Group top={40}>
        {data.map(d => {
          const letter = getLetter(d);
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - yScale(getLetterFrequency(d));
          const barX = xScale(letter);
          const barY = yMax - barHeight;
          return (
            <Bar
              key={\`bar-\${letter}\`}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill="rgba(23, 233, 217, .5)"
              onClick={() => {
                if (events) alert(\`clicked: \${JSON.stringify(Object.values(d))}\`);
              }}
            />
          );
        })}
      </Group>
    </svg>
  );
};

`}
    </Show>
  );
};
