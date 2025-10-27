import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { scaleLinear } from '@visx/scale';
import { AxisBottom } from '../src';
import { addMock, removeMock } from './svgMock';

const axisProps = {
  scale: scaleLinear({
    range: [10, 0],
    round: true,
    domain: [0, 10],
  }),
};

describe('<AxisBottom />', () => {
  const renderAxis = (props = {}) =>
    render(
      <svg>
        <AxisBottom {...axisProps} {...props} />
      </svg>,
    );

  beforeEach(addMock);
  afterEach(removeMock);

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

  it('should render with different labelOffsets', () => {
    const { container } = renderAxis({ labelOffset: 50, label: 'test' });
    const label = container.querySelector('.visx-axis-label');
    expect(label?.getAttribute('y')).toBe('78');
  });

  it('should have default tickLength of 8', () => {
    const { container } = renderAxis();
    const ticks = container.querySelectorAll('.visx-axis-tick line');
    ticks.forEach((tick) => {
      expect(tick).toHaveAttribute('y2', '8');
    });
  });

  it('should set custom tickLength', () => {
    const tickLength = 15;
    const { container } = renderAxis({ tickLength });
    const ticks = container.querySelectorAll('.visx-axis-tick line');
    ticks.forEach((tick) => {
      expect(tick).toHaveAttribute('y2', '15');
    });
  });
});
