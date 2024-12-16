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
import { AxisTop } from '../src';
import Axis from '../src/axis/Axis';

jest.mock('../src/axis/Axis');

const axisProps = {
  scale: scaleLinear({
    range: [10, 0],
    round: true,
    domain: [0, 10],
  }),
};

describe('<AxisTop />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(AxisTop).toBeDefined();
  });

  it('should render with class .visx-axis-top', () => {
    render(<AxisTop {...axisProps} />);
    const props = (Axis as jest.Mock).mock.calls[0][0];
    expect(props.axisClassName).toBe('visx-axis-top');
  });

  it('should set user-specified class names', () => {
    const axisClassName = 'axis-test-class';
    const axisLineClassName = 'axisline-test-class';
    const labelClassName = 'label-test-class';
    const tickClassName = 'tick-test-class';

    render(
      <AxisTop
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

  it('should default labelOffset prop to 8', () => {
    render(<AxisTop {...axisProps} />);
    const props = (Axis as jest.Mock).mock.calls[0][0];
    expect(props.labelOffset).toBe(8);
  });

  it('should set labelOffset prop', () => {
    const labelOffset = 3;
    render(<AxisTop {...axisProps} labelOffset={labelOffset} />);
    const props = (Axis as jest.Mock).mock.calls[0][0];
    expect(props.labelOffset).toEqual(labelOffset);
  });

  it('should default tickLength prop to 8', () => {
    render(<AxisTop {...axisProps} />);
    const props = (Axis as jest.Mock).mock.calls[0][0];
    expect(props.tickLength).toBe(8);
  });

  it('should set tickLength prop', () => {
    const tickLength = 15;
    render(<AxisTop {...axisProps} tickLength={tickLength} />);
    const props = (Axis as jest.Mock).mock.calls[0][0];
    expect(props.tickLength).toEqual(tickLength);
  });

  it('should set label prop', () => {
    const label = 'test';
    render(<AxisTop {...axisProps} label={label} />);
    const props = (Axis as jest.Mock).mock.calls[0][0];
    expect(props.label).toEqual(label);
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":8,"failed":0,"total":8,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
