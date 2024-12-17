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
import '@testing-library/jest-dom'; // Added for toHaveAttribute matcher
import { scaleLinear } from '@visx/scale';
import { GridRows } from '../src';

describe('<GridRows />', () => {
  it('should be defined', () => {
    expect(GridRows).toBeDefined();
  });

  it('should create grid lines with correct attributes', () => {
    const { container } = render(
      <svg width={400} height={400}>
        <GridRows
          scale={scaleLinear({ range: [0, 100] })}
          width={400}
          strokeDasharray="3,3"
          strokeOpacity={0.3}
          pointerEvents="none"
        />
      </svg>
    );
    
    const lines = container.querySelectorAll('.visx-line');
    expect(lines).toHaveLength(11);

    // Verify line attributes were passed through
    lines.forEach(line => {
      expect(line).toHaveAttribute('stroke-dasharray', '3,3');
      expect(line).toHaveAttribute('stroke-opacity', '0.3');
      expect(line).toHaveAttribute('pointer-events', 'none');
    });
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":2,"failed":0,"total":2,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
