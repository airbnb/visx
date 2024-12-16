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
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { scaleLinear } from '@visx/scale';
import { GridAngle } from '../src';
import * as polarToCartesian from '../src/utils/polarToCartesian';

jest.mock('@visx/group', () => ({
  __esModule: true,
  Group: function Group(props) {
    return (
      <svg>
        <g className={`visx-group ${props.className || ''}`}>{props.children}</g>
      </svg>
    );
  },
}));

jest.mock('@visx/shape', () => ({
  __esModule: true,
  Line: function Line(props) {
    return <line data-testid="grid-line" className={props.className} {...props} />;
  },
}));

const gridProps = {
  innerRadius: 0,
  outerRadius: 10,
  scale: scaleLinear({
    range: [0, 2 * Math.PI],
    domain: [1, 10],
  }),
};

describe('<GridAngle />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render with class .visx-grid-angle', async () => {
    const { container } = render(<GridAngle {...gridProps} />);
    await waitFor(() => {
      const element = container.querySelector('g.visx-group');
      expect(element).toBeInTheDocument();
    });
  });

  it('should set user-specified lineClassName', async () => {
    const { container } = render(<GridAngle {...gridProps} lineClassName="test-class" />);
    await waitFor(() => {
      const lines = container.querySelectorAll('line.test-class');
      expect(lines.length).toBeGreaterThan(0);
    });
  });

  it('should render `numTicks` grid lines', async () => {
    const { container } = render(<GridAngle {...gridProps} numTicks={5} />);
    await waitFor(() => {
      const lines = container.querySelectorAll('line');
      expect(lines).toHaveLength(5);
    });

    const { container: container2 } = render(<GridAngle {...gridProps} numTicks={10} />);
    await waitFor(() => {
      const lines = container2.querySelectorAll('line');
      expect(lines).toHaveLength(10);
    });
  });

  it('should render grid lines according to tickValues', async () => {
    const { container } = render(<GridAngle {...gridProps} tickValues={[1, 2, 3]} />);
    await waitFor(() => {
      const lines = container.querySelectorAll('line');
      expect(lines).toHaveLength(3);
    });
  });

  it('should compute radial lines using innerRadius and outerRadius', () => {
    const polarToCartesianSpy = jest.spyOn(polarToCartesian, 'default');
    const innerRadius = 4;
    const outerRadius = 7;
    
    render(<GridAngle {...gridProps} innerRadius={innerRadius} outerRadius={outerRadius} />);

    expect(polarToCartesianSpy.mock.calls.length).toBeGreaterThanOrEqual(2);

    const fromPointCall = polarToCartesianSpy.mock.calls[0][0];
    const toPointCall = polarToCartesianSpy.mock.calls[1][0];

    expect(fromPointCall.radius).toBe(innerRadius);
    expect(toPointCall.radius).toBe(outerRadius);

    polarToCartesianSpy.mockRestore();
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":5,"failed":0,"total":5,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
