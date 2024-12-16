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
import { MarkerLine } from '../src';
import { Marker } from '../src';

jest.mock('../src/markers/Marker', () => ({
  __esModule: true,
  default: jest.fn(() => null)
}));

describe('<MarkerLine />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('it should be defined', () => {
    expect(MarkerLine).toBeDefined();
  });

  test('it should render a Marker component', () => {
    render(<MarkerLine id="marker-line-test" />);
    expect(Marker).toHaveBeenCalled();
  });

  test('it should pass correct props to Marker', () => {
    const size = 8;
    const strokeWidth = 1;
    const stroke = 'blue';
    
    render(<MarkerLine id="marker-line-test" size={size} stroke={stroke} strokeWidth={strokeWidth} />);
    
    expect(Marker).toHaveBeenCalledTimes(1);
    const props = (Marker as jest.Mock).mock.calls[0][0];
    const max = Math.max(size, strokeWidth * 2);
    const midX = max / 2;
    const midY = size / 2;

    expect(props.markerWidth).toBe(max);
    expect(props.markerHeight).toBe(size);
    expect(props.refX).toBe(midX);
    expect(props.refY).toBe(midY);
    expect(props.fill).toBe(stroke);
    
    // Check the rect element props individually
    const rectElement = props.children;
    expect(rectElement.type).toBe('rect');
    expect(rectElement.props).toEqual({
      width: strokeWidth,
      height: size,
      x: midX
    });
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":3,"failed":0,"total":3,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
