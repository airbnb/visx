import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { scaleBand, scaleLinear } from '@visx/scale';
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

  test('centers horizontal stacks on a continuous y scale independently of their values', () => {
    const yScale = scaleLinear({ domain: [0, 10], range: [0, 100] });
    const xScale = scaleLinear({ domain: [0, 100], range: [0, 200] });
    const { container } = render(
      <svg>
        <BarStackHorizontal
          data={[
            { position: 2, first: 10, second: 20 },
            { position: 8, first: 30, second: 40 },
          ]}
          y={(d) => d.position}
          xScale={xScale}
          yScale={yScale}
          color={() => 'blue'}
          keys={['first', 'second']}
        />
      </svg>,
    );

    const bars = Array.from(container.querySelectorAll('rect'));
    expect(bars).toHaveLength(4);
    expect(bars.map((bar) => Number(bar.getAttribute('width')))).toEqual([20, 60, 40, 80]);
    expect(bars.map((bar) => Number(bar.getAttribute('height')))).toEqual([50, 50, 50, 50]);
    expect(bars.map((bar) => Number(bar.getAttribute('y')))).toEqual([-5, 55, -5, 55]);
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
