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
import { AnimatedGridColumns } from '../src';

describe('AnimatedGridColumns', () => {
  const defaultProps = {
    scale: scaleLinear({ domain: [0, 10], range: [0, 10] }),
    width: 100,
    height: 100,
    numTicks: 5,
  };

  it('should be defined', () => {
    expect(AnimatedGridColumns).toBeDefined();
  });

  it('should render without crashing', () => {
    const { container } = render(
      <svg>
        <AnimatedGridColumns {...defaultProps} />
      </svg>
    );
    
    // Check that SVG elements are rendered
    const gridGroup = container.querySelector('g');
    expect(gridGroup).toBeInTheDocument();
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":2,"failed":0,"total":2,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
