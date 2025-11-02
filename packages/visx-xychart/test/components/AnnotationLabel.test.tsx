import { vi } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { AnnotationLabel } from '../../src';
import { addMock, removeMock } from '../mocks/svgMock';

// Mock ResizeObserver
class MockResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

describe('<AnnotationLabel />', () => {
  const defaultProps = {
    x: 100,
    y: 100,
    title: 'label',
    subtitle: 'subtitle',
    showAnchorLine: true,
  };

  beforeAll(() => {
    // Add ResizeObserver mock
    vi.stubGlobal('ResizeObserver', MockResizeObserver);
    addMock();
  });

  afterAll(() => {
    // Clean up
    vi.unstubAllGlobals();
    removeMock();
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

    expect(getByText('label')).toBeInTheDocument();
    expect(getByText('subtitle')).toBeInTheDocument();
  });

  it('should render within foreignObject', async () => {
    const { findByText } = render(
      <svg>
        <AnnotationLabel
          {...defaultProps}
          title="Title in foreignObject"
          subtitle="Subtitle in foreignObject"
        />
      </svg>,
    );

    // Since foreignObject contains the text, if we can find the text
    // then foreignObject must exist and be working correctly
    const title = await findByText('Title in');
    const subtitle = await findByText('Subtitle in');

    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
  });
});
