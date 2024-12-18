import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { scaleBand } from '@visx/scale';
import { BarStack } from '../src';

const scale = scaleBand({
  domain: [0, 100],
  range: [0, 100],
});

describe('<BarStack />', () => {
  test('it should be defined', () => {
    expect(BarStack).toBeDefined();
  });

  test('it should have className .visx-bar-stack', () => {
    const { container } = render(
      <svg>
        <BarStack
          data={[]}
          top={2}
          left={3}
          x={(d) => d}
          xScale={scale}
          yScale={scale}
          color={(d) => d}
          keys={[]}
        />
      </svg>,
    );

    expect(container.querySelector('.visx-bar-stack')).toBeInTheDocument();
  });

  test('it should set className prop', () => {
    const { container } = render(
      <svg>
        <BarStack
          className="test"
          data={[]}
          top={2}
          left={3}
          x={(d) => d}
          xScale={scale}
          yScale={scale}
          color={(d) => d}
          keys={[]}
        />
      </svg>,
    );

    const element = container.querySelector('.visx-bar-stack');
    expect(element).toHaveClass('visx-bar-stack');
    expect(element).toHaveClass('test');
  });

  test('it should set top & left props', () => {
    const { container } = render(
      <svg>
        <BarStack
          className="test"
          data={[]}
          top={2}
          left={3}
          x={(d) => d}
          xScale={scale}
          yScale={scale}
          color={(d) => d}
          keys={[]}
        />
      </svg>,
    );

    const element = container.querySelector('.visx-bar-stack');
    expect(element).toHaveAttribute('transform', 'translate(3, 2)');
  });
});
