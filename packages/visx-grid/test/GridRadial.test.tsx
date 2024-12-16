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
import { GridRadial } from '../src';

jest.mock('@visx/shape', () => ({
  Arc: jest.fn(({ className, children, ...props }) => (
    <path
      className={`visx-arc ${className || ''}`}
      data-testid="grid-arc"
      {...props}
    >
      {children}
    </path>
  )),
}));

jest.mock('@visx/group', () => ({
  Group: jest.fn(({ className, children }) => (
    <svg>
      <g className={className} data-testid="grid-group">
        {children}
      </g>
    </svg>
  )),
}));

const gridProps = {
  innerRadius: 0,
  outerRadius: 10,
  scale: scaleLinear({
    range: [1, 100],
    domain: [1, 10],
  }),
  startAngle: 0,
  endAngle: Math.PI * 2,
};

describe('<GridRadial />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(GridRadial).toBeDefined();
  });

  it('should render with class .visx-grid-radial', () => {
    const { container } = render(<GridRadial {...gridProps} />);
    const group = container.querySelector('.visx-grid-radial');
    expect(group).toBeInTheDocument();
  });

  it('should set user-specified lineClassName', () => {
    const { container } = render(
      <GridRadial {...gridProps} lineClassName="test-class" />
    );
    const paths = container.querySelectorAll('path.test-class');
    expect(paths.length).toBeGreaterThan(0);
    paths.forEach(path => {
      expect(path).toHaveClass('test-class');
    });
  });

  it('should render `numTicks` grid line arcs', () => {
    const { container } = render(
      <GridRadial {...gridProps} numTicks={5} />
    );
    const paths = container.querySelectorAll('path.visx-arc');
    expect(paths).toHaveLength(5);

    const { container: container2 } = render(
      <GridRadial {...gridProps} numTicks={10} />
    );
    const paths2 = container2.querySelectorAll('path.visx-arc');
    expect(paths2).toHaveLength(10);
  });

  it('should render grid line arcs according to tickValues', () => {
    const { container } = render(
      <GridRadial {...gridProps} tickValues={[1, 2, 3]} />
    );
    const paths = container.querySelectorAll('path.visx-arc');
    expect(paths).toHaveLength(3);
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":5,"failed":0,"total":5,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
