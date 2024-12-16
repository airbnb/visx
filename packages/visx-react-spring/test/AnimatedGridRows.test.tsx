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
import { AnimatedGridRows } from '../src';

describe('AnimatedGridRows', () => {
  const defaultProps = {
    width: 100,
    height: 100,
    scale: scaleLinear({ 
      domain: [0, 10], 
      range: [0, 100] 
    }),
    numTicks: 5
  };

  it('should be defined', () => {
    expect(AnimatedGridRows).toBeDefined();
  });

  it('should render without crashing', () => {
    const { container } = render(
      <svg>
        <AnimatedGridRows {...defaultProps} />
      </svg>
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.querySelector('g')).toBeInTheDocument();
  });

  it('should render with custom dimensions', () => {
    const { container } = render(
      <svg>
        <AnimatedGridRows
          {...defaultProps}
          width={200}
          height={200}
        />
      </svg>
    );
    const gridGroup = container.querySelector('g');
    expect(gridGroup).toBeInTheDocument();
    expect(gridGroup?.getAttribute('transform')).toBeDefined();
  });

  it('should render with custom scale', () => {
    const customScale = scaleLinear({
      domain: [0, 100],
      range: [0, 500]
    });

    const { container } = render(
      <svg>
        <AnimatedGridRows
          {...defaultProps}
          scale={customScale}
        />
      </svg>
    );
    const gridGroup = container.querySelector('g');
    expect(gridGroup).toBeInTheDocument();
    expect(gridGroup?.getAttribute('transform')).toBeDefined();
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":4,"failed":0,"total":4,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
