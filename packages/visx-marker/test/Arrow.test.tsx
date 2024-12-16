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
import { MarkerArrow, Marker } from '../src';

jest.mock('../src/markers/Marker', () => ({
  default: jest.fn(() => null),
  __esModule: true,
}));

describe('<MarkerArrow />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('it should be defined', () => {
    expect(MarkerArrow).toBeDefined();
  });

  test('it should render marker with correct structure', () => {
    render(<MarkerArrow id="marker-circle-test" />);
    expect(Marker).toHaveBeenCalled();
    const markerProps = (Marker as jest.Mock).mock.calls[0][0];
    expect(markerProps.id).toBe('marker-circle-test');
  });

  test('it should size correctly', () => {
    const size = 8;
    const strokeWidth = 1;
    const max = size + strokeWidth * 2;
    const midX = size;
    const midY = max / 2;

    render(<MarkerArrow id="marker-circle-test" size={size} strokeWidth={strokeWidth} />);
    
    const markerProps = (Marker as jest.Mock).mock.calls[0][0];
    expect(markerProps.markerWidth).toBe(max);
    expect(markerProps.markerHeight).toBe(max);
    expect(markerProps.refX).toBe(midX);
    expect(markerProps.refY).toBe(midY);
    
    expect(markerProps.children).toMatchInlineSnapshot(`
      <g
        transform="translate(1, 1)"
      >
        <polyline
          points="0 0, 8 4, 0 8"
        />
      </g>
    `);
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":3,"failed":0,"total":3,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
