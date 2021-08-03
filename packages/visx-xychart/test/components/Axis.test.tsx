import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import BaseAxis from '../../src/components/axis/BaseAxis';
import { Axis, AnimatedAxis, DataContext, lightTheme } from '../../src';
import getDataContext from '../mocks/getDataContext';

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
});
