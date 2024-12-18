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
      range: [0, 100],
    }),
    numTicks: 5,
  };

  it('should be defined', () => {
    expect(AnimatedGridRows).toBeDefined();
  });

  it('should render without crashing', () => {
    const { container } = render(
      <svg>
        <AnimatedGridRows {...defaultProps} />
      </svg>,
    );
    expect(container.querySelector('g.visx-rows')).toBeInTheDocument();
  });

  it('should render with custom dimensions', () => {
    const { container } = render(
      <svg>
        <AnimatedGridRows {...defaultProps} width={200} />
      </svg>,
    );
    const gridGroup = container.querySelector('g.visx-rows');
    expect(gridGroup).toBeInTheDocument();

    const lines = container.querySelectorAll('line');
    expect(lines[0]).toHaveAttribute('x2', '200');
  });

  it('should render with custom scale', () => {
    const customScale = scaleLinear({
      domain: [0, 100],
      range: [0, 500],
    });

    const { container } = render(
      <svg>
        <AnimatedGridRows {...defaultProps} scale={customScale} />
      </svg>,
    );
    const gridGroup = container.querySelector('g.visx-rows');
    expect(gridGroup).toBeInTheDocument();
    expect(gridGroup?.getAttribute('transform')).toBeDefined();
  });
});
