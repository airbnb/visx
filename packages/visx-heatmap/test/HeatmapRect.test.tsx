import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HeatmapRect } from '../src';

const data = [{ bin: 0, bins: [{ bin: 0, count: 1 }] }];

const xScale = () => 50;
const yScale = () => 50;

describe('<HeatmapRect />', () => {
  test('it should be defined', () => {
    expect(HeatmapRect).toBeDefined();
  });

  test('it should have the .visx-heatmap-rects class', () => {
    const { container } = render(
      <svg>
        <HeatmapRect data={data} xScale={xScale} yScale={yScale} />
      </svg>,
    );
    const group = container.querySelector('svg g');
    expect(group).toHaveClass('visx-heatmap-rects');
  });

  test('it should have the .visx-heatmap-rect class', () => {
    const { container } = render(
      <svg>
        <HeatmapRect data={data} xScale={xScale} yScale={yScale} className="test" />
      </svg>,
    );
    const rect = container.querySelector('svg rect');
    expect(rect).not.toBeNull();
    expect(rect).toHaveClass('visx-heatmap-rect');
    expect(rect).toHaveClass('test');
  });

  test('it should set <rect /> width & height to bin{Width,Height} - gap', () => {
    const { container } = render(
      <svg>
        <HeatmapRect
          data={data}
          xScale={xScale}
          yScale={yScale}
          binWidth={10}
          binHeight={14}
          gap={2}
        />
      </svg>,
    );
    const rect = container.querySelector('svg rect');
    expect(rect).not.toBeNull();
    expect(rect).toHaveAttribute('width', '8');
    expect(rect).toHaveAttribute('height', '12');
  });
});
