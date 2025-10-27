import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { scaleLinear } from '@visx/scale';
import { AxisRight } from '../src';
import { addMock, removeMock } from './svgMock';

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
      </svg>,
    );

  beforeEach(addMock);
  afterEach(removeMock);

  it('should be defined', () => {
    expect(AxisRight).toBeDefined();
  });

  it('should render with default props', () => {
    const { container } = renderAxis();
    const axis = container.querySelector('.visx-axis-right');
    expect(axis).toBeInTheDocument();

    // Default props are reflected in rendered output
    const ticks = container.querySelectorAll('.visx-axis-tick');
    expect(ticks.length).toBeGreaterThan(0);
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

  it('should render label correctly', () => {
    const label = 'test';
    const { container } = renderAxis({ label });

    const labelElement = container.querySelector('.visx-axis-label');
    expect(labelElement).toHaveTextContent(label);
  });

  it('should rotate label by default', () => {
    const { container } = renderAxis({
      label: 'Test Label',
    });
    const label = container.querySelector('text.visx-axis-label');
    expect(label).toHaveAttribute('transform', 'rotate(90)');
  });

  it('should use default labelOffset of 36', () => {
    const { container } = renderAxis({
      label: 'Test Label',
    });
    const label = container.querySelector('.visx-axis-label');
    expect(label?.getAttribute('y')).toBe('-44');
    expect(label?.getAttribute('x')).toBe('5');
  });

  it('should apply custom labelOffset', () => {
    const labelOffset = 3;
    const { container } = renderAxis({
      label: 'Test Label',
      labelOffset,
    });
    const label = container.querySelector('.visx-axis-label');
    expect(label?.getAttribute('y')).toBe('-11');
    expect(label?.getAttribute('x')).toBe('5');
  });

  it('should use default tickLength', () => {
    const { container } = renderAxis();
    const tick = container.querySelector('.visx-axis-tick line');
    expect(tick).toHaveAttribute('x2', '8');
  });

  it('should set custom tickLength', () => {
    const tickLength = 15;
    const { container } = renderAxis({ tickLength });
    const tick = container.querySelector('.visx-axis-tick line');
    expect(tick).toHaveAttribute('x2', `${tickLength}`);
  });
});
