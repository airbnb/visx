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
import { AxisLeft } from '../src';
import { Axis } from '../src';

jest.mock('../src/axis/Axis', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

const axisProps = {
  scale: scaleLinear({
    range: [10, 0],
    round: true,
    domain: [0, 10],
  }),
};

describe('<AxisLeft />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(AxisLeft).toBeDefined();
  });

  it('should render with correct class', () => {
    render(<AxisLeft {...axisProps} />);
    const props = (Axis as jest.Mock).mock.calls[0][0];
    expect(props.axisClassName).toBe('visx-axis-left');
  });

  it('should apply custom class names', () => {
    const axisClassName = 'axis-test-class';
    const axisLineClassName = 'axisline-test-class';
    const labelClassName = 'label-test-class';
    const tickClassName = 'tick-test-class';

    render(
      <AxisLeft
        {...axisProps}
        axisClassName={axisClassName}
        axisLineClassName={axisLineClassName}
        labelClassName={labelClassName}
        tickClassName={tickClassName}
      />,
    );

    const props = (Axis as jest.Mock).mock.calls[0][0];
    expect(props.axisClassName).toMatch(axisClassName);
    expect(props.axisLineClassName).toBe(axisLineClassName);
    expect(props.labelClassName).toBe(labelClassName);
    expect(props.tickClassName).toBe(tickClassName);
  });

  it('should use default labelOffset', () => {
    render(<AxisLeft {...axisProps} />);
    const props = (Axis as jest.Mock).mock.calls[0][0];
    expect(props.labelOffset).toBe(36);
  });

  it('should set custom labelOffset', () => {
    const labelOffset = 3;
    render(<AxisLeft {...axisProps} labelOffset={labelOffset} />);
    const props = (Axis as jest.Mock).mock.calls[0][0];
    expect(props.labelOffset).toBe(labelOffset);
  });

  it('should use default tickLength', () => {
    render(<AxisLeft {...axisProps} />);
    const props = (Axis as jest.Mock).mock.calls[0][0];
    expect(props.tickLength).toBe(8);
  });

  it('should set custom tickLength', () => {
    const tickLength = 15;
    render(<AxisLeft {...axisProps} tickLength={tickLength} />);
    const props = (Axis as jest.Mock).mock.calls[0][0];
    expect(props.tickLength).toBe(tickLength);
  });

  it('should render label text', () => {
    const label = 'test';
    render(<AxisLeft {...axisProps} label={label} />);
    const props = (Axis as jest.Mock).mock.calls[0][0];
    expect(props.label).toBe(label);
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":8,"failed":0,"total":8,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
