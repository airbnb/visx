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
import { scaleLinear } from '@visx/scale';
import { Axis, AxisRight } from '../src';

jest.mock('../src/axis/Axis', () => ({
  default: jest.fn(() => null),
  __esModule: true,
}));

const axisProps = {
  scale: scaleLinear({
    range: [10, 0],
    round: true,
    domain: [0, 10],
  }),
};

describe('<AxisRight />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(AxisRight).toBeDefined();
  });

  it('should render with correct class names', () => {
    render(<AxisRight {...axisProps} />);
    const props = (Axis as jest.Mock).mock.calls[0][0];
    expect(props.axisClassName).toBe('visx-axis-right');
  });

  it('should apply custom class names', () => {
    const customProps = {
      axisClassName: 'axis-test-class',
      axisLineClassName: 'axisline-test-class',
      labelClassName: 'label-test-class',
      tickClassName: 'tick-test-class',
    };

    render(<AxisRight {...axisProps} {...customProps} />);
    const props = (Axis as jest.Mock).mock.calls[0][0];

    expect(props.axisClassName).toMatch(customProps.axisClassName);
    expect(props.axisLineClassName).toBe(customProps.axisLineClassName);
    expect(props.labelClassName).toBe(customProps.labelClassName);
    expect(props.tickClassName).toBe(customProps.tickClassName);
  });

  it('should render with default props', () => {
    render(<AxisRight {...axisProps} />);
    const props = (Axis as jest.Mock).mock.calls[0][0];

    expect(props.labelOffset).toBe(36);
    expect(props.tickLength).toBe(8);
  });

  it('should render with custom props', () => {
    const labelOffset = 3;
    const tickLength = 15;

    render(<AxisRight {...axisProps} labelOffset={labelOffset} tickLength={tickLength} />);
    const props = (Axis as jest.Mock).mock.calls[0][0];

    expect(props.labelOffset).toBe(labelOffset);
    expect(props.tickLength).toBe(tickLength);
  });

  it('should render label correctly', () => {
    const label = 'test';
    render(<AxisRight {...axisProps} label={label} />);
    const props = (Axis as jest.Mock).mock.calls[0][0];
    
    expect(props.label).toBe(label);
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":6,"failed":0,"total":6,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
