import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { scaleLinear } from '@visx/scale';
import { AnimatedTicks } from '../src';
import { addMock, removeMock } from './svgMock';

describe('AnimatedTicks', () => {
  beforeEach(addMock);
  afterEach(removeMock);

  it('should be defined', () => {
    expect(AnimatedTicks).toBeDefined();
  });

  it('should render tickComponent defined', () => {
    const { getByText } = render(
      <svg>
        <AnimatedTicks
          hideTicks={false}
          horizontal={false}
          orientation="bottom"
          tickComponent={() => <text>Test Component</text>}
          scale={scaleLinear({ domain: [0, 10], range: [0, 10] })}
          tickLabelProps={[]}
          ticks={[
            {
              from: { x: 0, y: 0 },
              to: { x: 0, y: 5 },
              value: 0,
              index: 0,
              formattedValue: '0',
            },
          ]}
        />
      </svg>,
    );

    expect(getByText('Test Component')).toBeInTheDocument();
  });

  it('should render without errors', () => {
    const { container } = render(
      <svg>
        <AnimatedTicks
          hideTicks={false}
          horizontal={false}
          orientation="bottom"
          scale={scaleLinear({ domain: [0, 10], range: [0, 10] })}
          tickLabelProps={[]}
          ticks={[
            { from: { x: 0, y: 0 }, to: { x: 0, y: 5 }, value: 0, index: 0, formattedValue: '0' },
          ]}
        />
      </svg>,
    );
    // Check that ticks are rendered
    const tickGroup = container.querySelector('.visx-axis-tick');
    expect(tickGroup).toBeInTheDocument();
  });
});
