import React from 'react';
import { Text } from '@visx/text';
import { scaleSqrt } from '@visx/scale';
import Wordcloud from '../../../../visx-wordcloud/src/Wordcloud';
import { wordFreqTotoAfrica } from './words.fixture';

interface ExampleProps {
  width: number;
  height: number;
}

export interface WordData {
  text: string;
  value: number;
}

export default function Example({ width, height }: ExampleProps) {
  const colors = ['#143059', '#2F6B9A', '#82a6c2'];
  const fontScale = scaleSqrt({
    domain: [
      Math.min(...wordFreqTotoAfrica.map(w => w.value)),
      Math.max(...wordFreqTotoAfrica.map(w => w.value)),
    ],
    range: [10, 100],
  });

  return (
    <div className="wordcloud">
      <Wordcloud
        words={wordFreqTotoAfrica}
        width={width}
        height={height}
        fontSize={datum => fontScale(datum.value)}
        font={`Impact`}
        padding={2}
        rotate={() => 0}
        random={() => 0.5}
      >
        {words =>
          words.map((w, i) => (
            <Text
              key={w.text}
              fill={colors[i % colors.length]}
              textAnchor={'middle'}
              transform={`translate(${w.x}, ${w.y})rotate(${w.rotate})`}
              fontSize={w.size}
              fontFamily={'Impact'}
            >
              {w.text}
            </Text>
          ))
        }
      </Wordcloud>
      <style jsx>{`
        .wordcloud {
          display: flex;
          flex-direction: column;
          user-select: none;
        }
        svg {
          margin: 1rem 0;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
