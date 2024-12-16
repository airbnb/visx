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
import { Axis, AxisBottom } from '../src';

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

describe('<AxisBottom />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(AxisBottom).toBeDefined();
  });

  it('should render axis component', () => {
    render(<AxisBottom {...axisProps} />);
    expect(Axis).toHaveBeenCalled();
  });

  it('should use default props', () => {
    render(<AxisBottom {...axisProps} />);
    const props = jest.mocked(Axis).mock.calls[0][0];

    expect(props.axisClassName).toBe('visx-axis-bottom');
    expect(props.labelOffset).toBe(8);
    expect(props.tickLength).toBe(8);
  });

  it('should use custom props', () => {
    const customProps = {
      axisClassName: 'axis-test-class',
      axisLineClassName: 'axisline-test-class',
      labelClassName: 'label-test-class',
      tickClassName: 'tick-test-class',
      labelOffset: 3,
      tickLength: 15,
    };

    render(<AxisBottom {...axisProps} {...customProps} />);
    const props = jest.mocked(Axis).mock.calls[0][0];

    expect(props.axisClassName).toBe(customProps.axisClassName);
    expect(props.axisLineClassName).toBe(customProps.axisLineClassName);
    expect(props.labelClassName).toBe(customProps.labelClassName);
    expect(props.tickClassName).toBe(customProps.tickClassName);
    expect(props.labelOffset).toBe(customProps.labelOffset);
    expect(props.tickLength).toBe(customProps.tickLength);
  });

  it('should render label correctly', () => {
    const label = 'test';
    jest.mocked(Axis).mockImplementation(({ children }) => <div>{children}</div>);

    const { getByText } = render(<AxisBottom {...axisProps} label={label} />);
    expect(getByText(label)).toBeInTheDocument();
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":8,"failed":0,"total":8,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"pending"}
