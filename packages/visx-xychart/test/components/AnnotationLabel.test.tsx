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
    title: 'Title',
    subtitle: 'Subtitle',
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
      </svg>,
    );

    expect(getByText('Title')).toBeInTheDocument();
    expect(getByText('Subtitle')).toBeInTheDocument();
  });
});
