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
import { AxisLeft } from '../src';

const axisProps = {
  scale: scaleLinear({
    range: [10, 0],
    round: true,
    domain: [0, 10],
  }),
};

describe('<AxisLeft />', () => {
  const renderAxis = (props = {}) => 
    render(
      <svg>
        <AxisLeft {...axisProps} {...props} />
      </svg>
    );

  it('should be defined', () => {
    expect(AxisLeft).toBeDefined();
  });

  it('should render with correct class', () => {
    const { container } = renderAxis();
    expect(container.querySelector('.visx-axis-left')).toBeInTheDocument();
  });

  it('should apply custom class names', () => {
    const axisClassName = 'axis-test-class';
    const axisLineClassName = 'axisline-test-class';
    const labelClassName = 'label-test-class';
    const tickClassName = 'tick-test-class';

    const { container } = renderAxis({
      label: "Test Label",
      axisClassName,
      axisLineClassName,
      labelClassName,
      tickClassName,
    });

    expect(container.querySelector(`g.${axisClassName}`)).toBeInTheDocument();
    expect(container.querySelector(`line.${axisLineClassName}`)).toBeInTheDocument();
    expect(container.querySelector(`text.${labelClassName}`)).toBeInTheDocument();
    expect(container.querySelector(`g.${tickClassName}`)).toBeInTheDocument();
  });

  it('should rotate label by default', () => {
    const { container } = renderAxis({
      label: "Test Label"
    });
    const label = container.querySelector('text.visx-axis-label');
    expect(label).toHaveAttribute('transform', 'rotate(-90)');
  });

  it('should rotate label with custom offset', () => {
    const labelOffset = 3;
    const { container } = renderAxis({ 
      label: "Test Label",
      labelOffset 
    });
    const label = container.querySelector('text.visx-axis-label');
    expect(label).toHaveAttribute('transform', 'rotate(-90)');
  });

  it('should use default tickLength', () => {
    const { container } = renderAxis();
    const tick = container.querySelector('.visx-axis-tick line');
    expect(tick).toHaveAttribute('x2', '-8');
  });

  it('should set custom tickLength', () => {
    const tickLength = 15;
    const { container } = renderAxis({ tickLength });
    const tick = container.querySelector('.visx-axis-tick line');
    expect(tick).toHaveAttribute('x2', `-${tickLength}`);
  });

  it('should render label text', () => {
    const label = 'test';
    const { getAllByText } = renderAxis({ label });
    const elements = getAllByText(label);
    expect(elements.length).toBeGreaterThan(0);
    expect(elements[0]).toBeInTheDocument();
  });
});
// MIGRATION STATUS: {"eslint":"pass","jest":{"passed":8,"failed":0,"total":8,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
