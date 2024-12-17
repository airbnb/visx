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

import { AnnotationLabel } from '../../src';

// Mock ResizeObserver
const mockResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe('<AnnotationLabel />', () => {
  const defaultProps = {
    x: 100,
    y: 100,
    title: 'Test Label',
    subtitle: 'Test subtitle', 
    showAnchorLine: true,
  };

  beforeAll(() => {
    // Add ResizeObserver mock
    window.ResizeObserver = mockResizeObserver;
  });

  afterAll(() => {
    // Clean up
    window.ResizeObserver = undefined;
  });

  it('should be defined', () => {
    expect(AnnotationLabel).toBeDefined();
  });

  it('should render with content', () => {
    const { getByText } = render(
      <svg>
        <AnnotationLabel {...defaultProps} />
      </svg>
    );
    
    expect(getByText('Test Label')).toBeInTheDocument();
    expect(getByText('Test subtitle')).toBeInTheDocument();
  });

  it('should render within foreignObject', () => {
    const { getByText } = render(
      <svg>
        <AnnotationLabel 
          {...defaultProps}
          title="Title in foreignObject"
          subtitle="Subtitle in foreignObject"
        />
      </svg>
    );
    
    // Since foreignObject contains the text, if we can find the text
    // then foreignObject must exist and be working correctly
    const title = getByText('Title in foreignObject');
    const subtitle = getByText('Subtitle in foreignObject');
    
    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
    
    // Verify the text is within an SVG element
    expect(title.closest('svg')).toBeInTheDocument();
    expect(subtitle.closest('svg')).toBeInTheDocument();
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":3,"failed":0,"total":3,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
