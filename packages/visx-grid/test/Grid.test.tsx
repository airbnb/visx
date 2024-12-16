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
import { scaleLinear } from '@visx/scale';
import { Grid } from '../src';

describe('<Grid />', () => {
  it('should be defined', () => {
    expect(Grid).toBeDefined();
  });

  it('should create grid lines', () => {
    const xScale = scaleLinear({
      domain: [0, 10],
      range: [0, 100],
    });

    const yScale = scaleLinear({
      domain: [0, 10],
      range: [0, 100],
    });

    const { container } = render(
      <svg>
        <Grid
          xScale={xScale}
          yScale={yScale}
          width={400}
          height={400}
          strokeDasharray="3,3"
          strokeOpacity={0.3}
          pointerEvents="none"
        />
      </svg>,
    );

    // Verify grid containers exist
    expect(container.querySelector('.visx-rows')).toBeInTheDocument();
    expect(container.querySelector('.visx-columns')).toBeInTheDocument();

    // Verify lines are rendered
    const lines = container.querySelectorAll('line');
    expect(lines.length).toBeGreaterThan(0);

    // Verify line attributes
    const firstLine = lines[0];
    expect(firstLine).toHaveAttribute('stroke-dasharray', '3,3');
    expect(firstLine).toHaveAttribute('stroke-opacity', '0.3');
    expect(firstLine).toHaveAttribute('pointer-events', 'none');
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":2,"failed":0,"total":2,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
