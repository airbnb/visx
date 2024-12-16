/** @jest-environment jsdom */
/**
 * LLM-GENERATED REFACTOR
 *
 * This file was migrated from Enzyme to RTL using generative AI.
 * To make the migration as clean as possible, the LLM was instructed to
 * use testing patterns similar to Enzyme.
 *
 * If you are making changes to this file, please consider refactoring
 * to more idiomatic RTL (and then removing this banner!).
 */
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
      </svg>
    );
    const group = container.querySelector('svg g');
    expect(group).toHaveClass('visx-heatmap-rects');
  });

  test('it should have the .visx-heatmap-rect class', () => {
    const { container } = render(
      <svg>
        <HeatmapRect 
          data={data} 
          xScale={xScale} 
          yScale={yScale} 
          className="test" 
        />
      </svg>
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
      </svg>
    );
    const rect = container.querySelector('svg rect');
    expect(rect).not.toBeNull();
    expect(rect).toHaveAttribute('width', '8');
    expect(rect).toHaveAttribute('height', '12');
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":4,"failed":0,"total":4,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
