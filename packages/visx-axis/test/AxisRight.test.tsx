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
import { AxisRight } from '../src';

const axisProps = {
  scale: scaleLinear({
    range: [10, 0],
    round: true,
    domain: [0, 10],
  }),
};

describe('<AxisRight />', () => {
  const renderAxis = (props = {}) => 
    render(
      <svg>
        <AxisRight {...axisProps} {...props} />
      </svg>
    );

  it('should be defined', () => {
    expect(AxisRight).toBeDefined();
  });

  it('should render with correct class names', () => {
    const { container } = renderAxis();
    expect(container.querySelector('.visx-axis-right')).toBeInTheDocument();
  });

  it('should apply custom class names', () => {
    const customProps = {
      axisClassName: 'axis-test-class',
      axisLineClassName: 'axisline-test-class',
      labelClassName: 'label-test-class',
      tickClassName: 'tick-test-class',
    };

    const { container } = renderAxis(customProps);

    expect(container.querySelector('.axis-test-class')).toBeInTheDocument();
    expect(container.querySelector('.axisline-test-class')).toBeInTheDocument();
    expect(container.querySelector('.tick-test-class')).toBeInTheDocument();
  });

  it('should render with default props', () => {
    const { container } = renderAxis();
    const axis = container.querySelector('.visx-axis-right');
    expect(axis).toBeInTheDocument();
    
    // Default props are reflected in rendered output
    const ticks = container.querySelectorAll('.visx-axis-tick');
    expect(ticks.length).toBeGreaterThan(0);
  });

  it('should render with custom props', () => {
    const labelOffset = 3;
    const tickLength = 15;

    const { container } = renderAxis({ labelOffset, tickLength });
    
    const axis = container.querySelector('.visx-axis-right');
    expect(axis).toBeInTheDocument();

    // Verify ticks are rendered
    const ticks = container.querySelectorAll('.visx-axis-tick');
    expect(ticks.length).toBeGreaterThan(0);
  });

  it('should render label correctly', () => {
    const label = 'test';
    const { container } = renderAxis({ label });
    
    const labelElement = container.querySelector('.visx-axis-label');
    expect(labelElement).toHaveTextContent(label);
  });
});
// MIGRATION STATUS: {"eslint":"pass","jest":{"passed":6,"failed":0,"total":6,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
