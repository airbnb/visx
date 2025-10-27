import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { scaleLinear } from '@visx/scale';
import { AxisLeft } from '../src';
import { addMock, removeMock } from './svgMock';

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
      </svg>,
    );

  beforeEach(addMock);
  afterEach(removeMock);

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
      label: 'Test Label',
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
      label: 'Test Label',
    });
    const label = container.querySelector('text.visx-axis-label');
    expect(label).toHaveAttribute('transform', 'rotate(-90)');
  });

  it('should use default labelOffset of 36', () => {
    const { container } = renderAxis({
      label: 'Test Label',
    });
    const label = container.querySelector('.visx-axis-label');
    expect(label?.getAttribute('y')).toBe('-44');
    expect(label?.getAttribute('x')).toBe('-5');
  });

  it('should apply custom labelOffset', () => {
    const labelOffset = 3;
    const { container } = renderAxis({
      label: 'Test Label',
      labelOffset,
    });
    const label = container.querySelector('.visx-axis-label');
    expect(label?.getAttribute('y')).toBe('-11');
    expect(label?.getAttribute('x')).toBe('-5');
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
