import React from 'react';
import Show from '../components/show';
import Patterns from '../components/tiles/patterns';

export default () => {
  return (
    <Show component={Patterns} title="Patterns" margin={{
      top: 10,
      left: 10,
      right: 10,
      bottom: 10,
    }}>
{`import React from 'react';
import { Bar } from '@vx/shape';
import {
  PatternLines,
  PatternCircles,
  PatternWaves
} from '@vx/pattern';

export default ({
  width,
  height,
}) => {
  const xMax = width;
  const yMax = height - 80;
  const pWidth = xMax / 4;
  const pHeight = yMax / 2;
  if (width < 10) return null;
  return (
    <svg width={width} height={height}>
      <PatternLines
        id='vLines'
        height={6}
        width={6}
        stroke='black'
        strokeWidth={1}
      />
      <PatternLines
        id='hLines'
        height={6}
        width={6}
        stroke='black'
        strokeWidth={1}
        orientation={['horizontal']}
      />
      <PatternLines
        id='dLines'
        height={6}
        width={6}
        stroke='black'
        strokeWidth={1}
        orientation={['diagonal']}
      />
      <PatternLines
        id='dhLines'
        height={6}
        width={6}
        stroke='black'
        strokeWidth={1}
        orientation={['vertical', 'horizontal']}
      />
      <PatternCircles
        id='Circles'
        height={6}
        width={6}
        fill="black"
      />
      <PatternCircles
        id='cCircles'
        height={10}
        width={10}
        fill="black"
        complement
      />
      <PatternWaves
        id='Waves'
        height={6}
        width={6}
        fill="transparent"
        stroke="black"
        strokeWidth={1}
        complement
      />
      <PatternWaves
        id='bWaves'
        height={12}
        width={12}
        fill="transparent"
        stroke="black"
        strokeWidth={1}
        complement
      />
      <Bar
        fill={\`url(#vLines)\`}
        height={pHeight}
        width={pWidth}
        x={0}
        y={0}
        rx={14}
      />
      <Bar
        fill={\`url(#hLines)\`}
        height={pHeight}
        width={pWidth}
        x={pWidth}
        y={0}
        rx={14}
      />
      <Bar
        fill={\`url(#dLines)\`}
        height={pHeight}
        width={pWidth}
        x={pWidth * 2}
        y={0}
        rx={14}
      />
      <Bar
        fill={\`url(#dhLines)\`}
        height={pHeight}
        width={pWidth}
        x={pWidth * 3}
        y={0}
        rx={14}
      />
      <Bar
        fill={\`url(#Circles)\`}
        height={pHeight}
        width={pWidth}
        x={0}
        y={pHeight}
        rx={14}
      />
      <Bar
        fill={\`url(#cCircles)\`}
        height={pHeight}
        width={pWidth}
        x={pWidth}
        y={pHeight}
        rx={14}
      />
      <Bar
        fill={\`url(#Waves)\`}
        height={pHeight}
        width={pWidth}
        x={pWidth * 2}
        y={pHeight}
        rx={14}
      />
      <Bar
        fill={\`url(#bWaves)\`}
        height={pHeight}
        width={pWidth}
        x={pWidth * 3}
        y={pHeight}
        rx={14}
      />
    </svg>
  );
}`}
    </Show>
  );
}
