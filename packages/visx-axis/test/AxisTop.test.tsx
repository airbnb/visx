import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { scaleLinear } from '@visx/scale';
import { AxisTop } from '../src';
import { addMock, removeMock } from './svgMock';

const axisProps = {
  scale: scaleLinear({
    range: [10, 0],
    round: true,
    domain: [0, 10],
  }),
};

describe('<AxisTop />', () => {
  const renderInSVG = (children: React.ReactElement) => render(<svg>{children}</svg>);

  beforeEach(addMock);
  afterEach(removeMock);

  it('should be defined', () => {
    expect(AxisTop).toBeDefined();
  });

  it('should render with class .visx-axis-top', () => {
    const { container } = renderInSVG(<AxisTop {...axisProps} />);
    const axis = container.querySelector('.visx-axis');
    expect(axis).toHaveClass('visx-axis-top');
  });

  it('should set user-specified class names', () => {
    const axisClassName = 'axis-test-class';
    const axisLineClassName = 'axisline-test-class';
    const labelClassName = 'label-test-class';
    const tickClassName = 'tick-test-class';

    const { container } = renderInSVG(
      <AxisTop
        {...axisProps}
        axisClassName={axisClassName}
        axisLineClassName={axisLineClassName}
        labelClassName={labelClassName}
        tickClassName={tickClassName}
        label="test"
      />,
    );

    const axis = container.querySelector('.visx-axis');
    expect(axis).toHaveClass('axis-test-class');
    expect(axis).toHaveClass('visx-axis-top');

    const axisLine = container.querySelector('.visx-axis-line');
    expect(axisLine).toHaveClass(axisLineClassName);

    const label = container.querySelector('.visx-axis-label');
    expect(label).toHaveClass(labelClassName);

    const tick = container.querySelector('.visx-axis-tick');
    expect(tick).toHaveClass(tickClassName);
  });

  it('should render with default labelOffset of 8', () => {
    const { container } = renderInSVG(<AxisTop {...axisProps} label="test label" />);
    const label = container.querySelector('.visx-axis-label');
    expect(label?.getAttribute('y')).toBe('-26');
  });

  it('should render with custom labelOffset', () => {
    const labelOffset = 3;
    const { container } = renderInSVG(
      <AxisTop {...axisProps} label="test label" labelOffset={labelOffset} />,
    );

    const label = container.querySelector('.visx-axis-label');
    expect(label?.getAttribute('y')).toBe('-21');
  });

  it('should render ticks with default length of 8', () => {
    const { container } = renderInSVG(<AxisTop {...axisProps} />);
    const ticks = container.querySelectorAll('.visx-axis-tick line.visx-line');
    ticks.forEach((tick) => {
      const y1 = Math.abs(parseFloat(tick.getAttribute('y1') || '0'));
      const y2 = Math.abs(parseFloat(tick.getAttribute('y2') || '0'));
      expect(Math.abs(y2 - y1)).toBe(8);
    });
  });

  it('should render ticks with custom length', () => {
    const tickLength = 15;
    const { container } = renderInSVG(<AxisTop {...axisProps} tickLength={tickLength} />);
    const ticks = container.querySelectorAll('.visx-axis-tick line.visx-line');
    ticks.forEach((tick) => {
      const y1 = Math.abs(parseFloat(tick.getAttribute('y1') || '0'));
      const y2 = Math.abs(parseFloat(tick.getAttribute('y2') || '0'));
      expect(Math.abs(y2 - y1)).toBe(tickLength);
    });
  });

  it('should render label text', () => {
    const label = 'test';
    const { getByText } = renderInSVG(<AxisTop {...axisProps} label={label} />);

    expect(getByText(label)).toBeInTheDocument();
  });
});
