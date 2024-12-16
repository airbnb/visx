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
import { scaleLinear } from '@visx/scale';
import { GridColumns } from '../src';

describe('<GridColumns />', () => {
  it('should be defined', () => {
    expect(GridColumns).toBeDefined();
  });

  it('should create grid lines', () => {
    const { container } = render(
      <svg>
        <GridColumns
          scale={scaleLinear({ range: [0, 100] })}
          height={400}
          strokeDasharray="3,3"
          strokeOpacity={0.3}
          pointerEvents="none"
        />
      </svg>,
    );
    
    const lines = container.querySelectorAll('.visx-line');
    expect(lines).toHaveLength(11);
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":2,"failed":0,"total":2,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
