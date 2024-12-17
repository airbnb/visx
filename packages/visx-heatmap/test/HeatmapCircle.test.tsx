import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { HeatmapCircle } from '../src';

const data: {
  bin: number;
  bins: { bin: number; count: number }[];
}[] = [{ bin: 0, bins: [{ bin: 0, count: 1 }] }];

const xScale = () => 50;
const yScale = () => 50;

describe('<HeatmapCircle />', () => {
  test('it should be defined', () => {
    expect(HeatmapCircle).toBeDefined();
  });

  test('it should have the .visx-heatmap-circles class', () => {
    expect.assertions(1);
    const { container } = render(
      <svg>
        <HeatmapCircle data={data} xScale={xScale} yScale={yScale} />
      </svg>,
    );
    expect(container.querySelector('.visx-heatmap-circles')).toBeInTheDocument();
  });

  test('it should have the .visx-heatmap-circle class', () => {
    expect.assertions(2);
    const { container } = render(
      <svg>
        <HeatmapCircle data={data} xScale={xScale} yScale={yScale} className="test" />
      </svg>,
    );
    const circle = container.querySelector('circle');
    expect(circle).toHaveClass('visx-heatmap-circle');
    expect(circle).toHaveClass('test');
  });

  test('it should set <circle /> r to radius - gap', () => {
    expect.assertions(1);
    const { container } = render(
      <svg>
        <HeatmapCircle data={data} xScale={xScale} yScale={yScale} radius={10} gap={2} />
      </svg>,
    );
    expect(container.querySelector('circle')).toHaveAttribute('r', '8');
  });
});
