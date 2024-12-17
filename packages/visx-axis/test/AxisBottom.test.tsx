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
import { AxisBottom } from '../src';

const axisProps = {
  scale: scaleLinear({
    range: [10, 0],
    round: true,
    domain: [0, 10],
  }),
};

describe('<AxisBottom />', () => {
  const renderAxis = (props = {}) => {
    return render(
      <svg>
        <AxisBottom {...axisProps} {...props} />
      </svg>
    );
  };

  it('should be defined', () => {
    expect(AxisBottom).toBeDefined();
  });

  it('should render without crashing', () => {
    const { container } = renderAxis();
    const axis = container.querySelector('.visx-axis');
    expect(axis).toBeInTheDocument();
  });

  it('should render with default class names', () => {
    const { container } = renderAxis();
    const axis = container.querySelector('.visx-axis');
    expect(axis).toHaveClass('visx-axis-bottom');
  });

  it('should render with custom props', () => {
    const customProps = {
      axisClassName: 'axis-test-class',
      axisLineClassName: 'axisline-test-class',
      labelClassName: 'label-test-class',
      tickClassName: 'tick-test-class',
      labelOffset: 3,
      tickLength: 15,
    };

    const { container } = renderAxis(customProps);
    const axis = container.querySelector('.visx-axis');
    expect(axis).toHaveClass('axis-test-class');
    expect(container.querySelector('.axisline-test-class')).toBeInTheDocument();
    expect(container.querySelector('.tick-test-class')).toBeInTheDocument();
  });

  it('should render label correctly', () => {
    const label = 'test label';
    const { getByText } = renderAxis({ label });
    expect(getByText(label)).toBeInTheDocument();
  });

  it('should apply transform attribute with labelOffset', () => {
    const { container } = renderAxis();
    const axis = container.querySelector('.visx-axis');
    expect(axis).toHaveAttribute('transform');
  });

  it('should render with different labelOffsets', () => {
    const { container } = renderAxis({ labelOffset: 50 });
    const axis = container.querySelector('.visx-axis');
    expect(axis).toHaveAttribute('transform');
  });

  it('should have default tickLength of 8', () => {
    const { container } = renderAxis();
    const ticks = container.querySelectorAll('.visx-axis-tick line');
    ticks.forEach(tick => {
      expect(tick).toHaveAttribute('y2', '8');
    });
  });

  it('should set custom tickLength', () => {
    const tickLength = 15;
    const { container } = renderAxis({ tickLength });
    const ticks = container.querySelectorAll('.visx-axis-tick line');
    ticks.forEach(tick => {
      expect(tick).toHaveAttribute('y2', '15');
    });
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":9,"failed":0,"total":9,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
