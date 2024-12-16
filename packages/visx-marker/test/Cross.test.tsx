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
import { MarkerCross } from '../src';
import { Marker } from '../src';

jest.mock('../src/markers/Marker', () => ({
  __esModule: true,
  default: jest.fn(({ children }) => (
    <svg>
      <g>{children}</g>
    </svg>
  )),
}));

describe('<MarkerCross />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('it should be defined', () => {
    expect(MarkerCross).toBeDefined();
  });

  test('it should render a Marker containing a polyline', () => {
    render(
      <svg>
        <MarkerCross id="marker-cross-test" />
      </svg>
    );
    
    const markerCallProps = (Marker as jest.Mock).mock.calls[0][0];
    expect(markerCallProps.children.type).toBe('polyline');
  });

  test('it should size correctly', () => {
    const size = 8;
    const strokeWidth = 1;
    
    render(
      <svg>
        <MarkerCross id="marker-cross-test" size={size} strokeWidth={strokeWidth} />
      </svg>
    );
    
    const bounds = size + strokeWidth;
    const mid = size / 2;
    const points = `0 ${mid}, ${mid} ${mid}, ${mid} 0, ${mid} ${size}, ${mid} ${mid}, ${size} ${mid}`;
    
    const props = (Marker as jest.Mock).mock.calls[0][0];
    expect(props.markerWidth).toBe(bounds);
    expect(props.markerHeight).toBe(bounds);
    expect(props.refX).toBe(mid);
    expect(props.refY).toBe(mid);
    expect(props.children.props.points).toBe(points);
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":3,"failed":0,"total":3,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
