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
      </svg>,
    );

    // Check that SVG elements are rendered
    const gridGroup = container.querySelector('g.visx-columns');
    expect(gridGroup).toBeInTheDocument();
  });
});
