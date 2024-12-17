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

import { AnnotationLineSubject } from '../../src';

describe('<AnnotationLineSubject />', () => {
  const defaultProps = {
    x: 100,
    y: 100,
    x1: 100,
    y1: 100,
    x2: 200,
    y2: 200
  };

  it('should be defined', () => {
    expect(AnnotationLineSubject).toBeDefined();
  });

  it('should render with minimal props', () => {
    const { container } = render(
      <svg>
        <AnnotationLineSubject {...defaultProps} />
      </svg>
    );
    
    const line = container.querySelector('line');
    expect(line).toBeInTheDocument();
    expect(line).toHaveAttribute('x1', '100');
    expect(line).toHaveAttribute('y1', '100');
    expect(line).toHaveAttribute('x2', '200');
    expect(line).toHaveAttribute('y2', '200');
  });

  it('should render with custom className', () => {
    const className = 'custom-line';
    const { container } = render(
      <svg>
        <AnnotationLineSubject {...defaultProps} className={className} />
      </svg>
    );
    
    const line = container.querySelector('line');
    expect(line).toBeInTheDocument();
    expect(line).toHaveClass(className);
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":3,"failed":0,"total":3,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
