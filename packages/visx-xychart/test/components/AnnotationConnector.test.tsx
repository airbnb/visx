import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { AnnotationConnector } from '../../src';

describe('<AnnotationConnector />', () => {
  const defaultProps = {
    x: 100,
    y: 100,
    dx: 50,
    dy: 50,
  };

  it('should be defined', () => {
    expect(AnnotationConnector).toBeDefined();
  });

  it('should render connector line', () => {
    const { container } = render(
      <svg>
        <AnnotationConnector {...defaultProps} />
      </svg>,
    );

    const path = container.querySelector('path');
    expect(path).toBeInTheDocument();

    // Verify the path has correct attributes
    expect(path).toHaveAttribute('d', expect.any(String));
    expect(path).toHaveAttribute('stroke', expect.any(String));
    expect(path).toHaveAttribute('fill', 'transparent');

    // Verify the path connects the correct points
    const dAttribute = path?.getAttribute('d') || '';
    expect(dAttribute).toContain('M100,100'); // Should start at x,y
    expect(dAttribute).toContain('150,150'); // Should end at x+dx,y+dy
  });
});
