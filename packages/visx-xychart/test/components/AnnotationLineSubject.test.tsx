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
    y2: 200,
  };

  it('should be defined', () => {
    expect(AnnotationLineSubject).toBeDefined();
  });

  it('should render with minimal props', () => {
    const { container } = render(
      <svg>
        <AnnotationLineSubject {...defaultProps} />
      </svg>,
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
      </svg>,
    );

    const line = container.querySelector('line');
    expect(line).toBeInTheDocument();
    expect(line).toHaveClass(className);
  });
});
