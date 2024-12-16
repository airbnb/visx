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
import { MarkerCircle } from '../src';
import { Marker } from '../src';

jest.mock('../src/markers/Marker', () => ({
  __esModule: true,
  default: jest.fn(({ children, ...props }) => (
    <svg>
      <g data-mock="marker" {...props}>
        {children}
      </g>
    </svg>
  )),
}));

describe('<MarkerCircle />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('it should be defined', () => {
    expect(MarkerCircle).toBeDefined();
  });

  test('it should render a <Marker> containing a <circle>', () => {
    const { container } = render(
      <svg>
        <MarkerCircle id="marker-circle-test" />
      </svg>
    );
    expect(Marker).toHaveBeenCalled();
    expect(container.querySelector('circle')).toBeInTheDocument();
  });

  test('it should size correctly', () => {
    const size = 8;
    const strokeWidth = 1;
    const diameter = size * 2;
    const bounds = diameter + strokeWidth;
    const mid = bounds / 2;

    const { container } = render(
      <svg>
        <MarkerCircle id="marker-circle-test" size={size} strokeWidth={strokeWidth} />
      </svg>
    );

    // Check Marker props
    const markerProps = (Marker as jest.Mock).mock.calls[0][0];
    expect(markerProps.markerWidth).toBe(bounds);
    expect(markerProps.markerHeight).toBe(bounds);
    expect(markerProps.refX).toBe(0);
    expect(markerProps.refY).toBe(mid);

    // Check circle attributes
    const circle = container.querySelector('circle');
    expect(circle).toHaveAttribute('r', size.toString());
    expect(circle).toHaveAttribute('cx', mid.toString());
    expect(circle).toHaveAttribute('cy', mid.toString());
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":3,"failed":0,"total":3,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
