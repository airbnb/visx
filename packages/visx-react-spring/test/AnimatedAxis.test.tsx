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
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { scaleLinear } from '@visx/scale';
import { AnimatedAxis } from '../src';

describe('AnimatedAxis', () => {
  const defaultProps = {
    scale: scaleLinear({ 
      domain: [0, 10], 
      range: [0, 100] 
    }),
    orientation: 'bottom',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(AnimatedAxis).toBeDefined();
  });

  it('should render without errors', async () => {
    const { container } = render(
      <svg width={100} height={100}>
        <AnimatedAxis 
          {...defaultProps}
        />
      </svg>
    );

    await waitFor(() => {
      // Check for SVG container
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();

      // Check for axis line
      const axisLine = container.querySelector('.visx-axis-line');
      expect(axisLine).toBeInTheDocument();

      // Check for tick elements
      const ticks = container.querySelectorAll('.visx-axis-tick');
      expect(ticks.length).toBeGreaterThan(0);

      // Check for tick labels
      const tickLabels = container.querySelectorAll('text');
      expect(tickLabels.length).toBeGreaterThan(0);
    });
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":2,"failed":0,"total":2,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
