import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { scaleBand } from '@visx/scale';
import { BarStackHorizontal } from '../src';

const scale = scaleBand({
  domain: [0, 100],
  range: [0, 100],
  paddingInner: 5,
  paddingOuter: 5,
});

describe('<BarStackHorizontal />', () => {
  test('it should be defined', () => {
    expect(BarStackHorizontal).toBeDefined();
  });

  test('it should have className .visx-bar-stack-horizontal', () => {
    const { container } = render(
      <svg>
        <BarStackHorizontal
          data={[]}
          top={2}
          left={3}
          y={(d) => d}
          xScale={scale}
          yScale={scale}
          color={(d) => d}
          keys={[]}
        />
      </svg>,
    );

    const element = container.querySelector('.visx-bar-stack-horizontal');
    expect(element).toBeInTheDocument();
  });

  test('it should set className prop', () => {
    const { container } = render(
      <svg>
        <BarStackHorizontal
          className="test"
          data={[]}
          top={2}
          left={3}
          y={(d) => d}
          xScale={scale}
          yScale={scale}
          color={(d) => d}
          keys={[]}
        />
      </svg>,
    );

    const element = container.querySelector('.visx-bar-stack-horizontal');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('visx-bar-stack-horizontal', 'test');
  });

  test('it should set top & left props', () => {
    const { container } = render(
      <svg>
        <BarStackHorizontal
          className="test"
          data={[]}
          top={2}
          left={3}
          y={(d) => d}
          xScale={scale}
          yScale={scale}
          color={(d) => d}
          keys={[]}
        />
      </svg>,
    );

    const element = container.querySelector('.visx-bar-stack-horizontal');
    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute('transform', 'translate(3, 2)');
  });
});
