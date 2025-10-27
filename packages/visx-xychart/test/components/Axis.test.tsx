import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { scaleLinear } from '@visx/scale';
import BaseAxis from '../../src/components/axis/BaseAxis';
import { Axis, AnimatedAxis, DataContext, lightTheme } from '../../src';
import getDataContext from '../mocks/getDataContext';
import { addMock, removeMock } from '../mocks/svgMock';

const series = { key: 'visx', data: [{}], xAccessor: () => 4, yAccessor: () => 7 };

function setup(
  children: React.ReactNode,
  contextOverrides?: Partial<ReturnType<typeof getDataContext>>,
) {
  return render(
    <DataContext.Provider value={{ ...getDataContext(series), ...contextOverrides }}>
      <svg>{children}</svg>
    </DataContext.Provider>,
  );
}

describe('<Axis />', () => {
  beforeAll(addMock);
  afterAll(removeMock);

  it('should be defined', () => {
    expect(Axis).toBeDefined();
  });
  it('should render a VxAxis', () => {
    expect(
      setup(<Axis orientation="bottom" />).container.querySelectorAll('.visx-axis'),
    ).toHaveLength(1);
  });
});

describe('<AnimatedAxis />', () => {
  beforeAll(addMock);
  afterAll(removeMock);

  it('should be defined', () => {
    expect(AnimatedAxis).toBeDefined();
  });
  it('should render a VxAnimatedAxis', () => {
    expect(
      setup(<AnimatedAxis orientation="bottom" />).container.querySelectorAll('.visx-axis'),
    ).toHaveLength(1);
  });
});

describe('<BaseAxis />', () => {
  beforeAll(addMock);
  afterAll(removeMock);

  it('should be defined', () => {
    expect(BaseAxis).toBeDefined();
  });
  it('<BaseAxis/> renders', () => {
    const { container } = setup(
      <BaseAxis orientation="top" AxisComponent={() => <Axis orientation="top" />} />,
    );
    const AxisComponents = container.querySelectorAll('.visx-axis');
    expect(AxisComponents).toHaveLength(1);
  });

  it('should use scale=xScale for orientation=top (or bottom)', () => {
    const xScale = scaleLinear({ domain: [0, 4], range: [0, 10] });
    const { container } = setup(
      <BaseAxis orientation="top" AxisComponent={() => <Axis orientation="top" />} />,
      { xScale },
    );
    const TickLabels = container.querySelectorAll('tspan');
    expect(TickLabels[0].textContent).toBe('0.0');
    expect(TickLabels[0]).toHaveAttribute('x', '0');
    expect(TickLabels[TickLabels.length - 1].textContent).toBe('4.0');
    expect(TickLabels[TickLabels.length - 1]).toHaveAttribute('x', '10');
  });

  it('should use scale=yScale for orientation=left (or right)', () => {
    const yScale = scaleLinear({ domain: [0, 4], range: [0, 10] });
    const { container } = setup(
      <BaseAxis orientation="left" AxisComponent={() => <Axis orientation="left" />} />,
      { yScale },
    );
    const TickLabels = container.querySelectorAll('tspan');
    expect(TickLabels[0].textContent).toBe('0.0');
    expect(TickLabels[0].parentNode).toHaveAttribute('y', '0');
    expect(TickLabels[TickLabels.length - 1].textContent).toBe('4.0');
    expect(TickLabels[TickLabels.length - 1].parentNode).toHaveAttribute('y', '10');
  });

  it('should use axis styles from context theme unless specified in props', () => {
    const axisStyles = lightTheme.axisStyles.x.top;
    const { container } = setup(
      <BaseAxis
        orientation="left"
        AxisComponent={() => <Axis orientation="top" stroke="#22222" tickLength={12345} />}
      />,
    );

    const VisxAxisLine = container.querySelector('.visx-axis-line');
    const VisxLine = container.querySelector('.visx-line');

    // specified styles in the props
    expect(VisxAxisLine).toHaveAttribute('stroke', '#22222');
    // tick length = y1-y2 of axis line
    expect(VisxLine).toHaveAttribute('y1', '0');
    expect(VisxLine).toHaveAttribute('y2', '-12345');

    // context theme styles
    expect(VisxLine).toHaveAttribute('stroke-width', `${axisStyles.axisLine.strokeWidth}`);
    expect(VisxLine).toHaveAttribute('stroke', axisStyles.tickLine.stroke);
  });

  it('should accept props for tickline', () => {
    const tickLineProps = { strokeWidth: 12345, stroke: 'banana', opacity: 0.5 };
    const { container } = setup(
      <BaseAxis
        orientation="left"
        AxisComponent={() => <AnimatedAxis orientation="top" tickLineProps={tickLineProps} />}
      />,
    );

    const VisxAxisTick = container.querySelector('.visx-axis-tick > line');

    // specified styles in the props
    expect(VisxAxisTick).toHaveAttribute('stroke-width', `${tickLineProps.strokeWidth}`);
    expect(VisxAxisTick).toHaveAttribute('stroke', `${tickLineProps.stroke}`);
    expect(VisxAxisTick).toHaveAttribute('opacity', `${tickLineProps.opacity}`);
  });
});
