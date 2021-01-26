import React from 'react';
import { mount } from 'enzyme';
import VxAnimatedAxis from '@visx/react-spring/lib/axis/AnimatedAxis';
import VxAxis from '@visx/axis/lib/axis/Axis';
import BaseAxis from '../../src/components/axis/BaseAxis';
import { Axis, AnimatedAxis, DataContext, lightTheme } from '../../src';
import getDataContext from '../mocks/getDataContext';

const series = { key: 'visx', data: [{}], xAccessor: () => 4, yAccessor: () => 7 };

function setup(
  children: React.ReactNode,
  contextOverrides?: Partial<ReturnType<typeof getDataContext>>,
) {
  return mount(
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
    expect(setup(<Axis orientation="bottom" />).find(VxAxis)).toHaveLength(1);
  });
});

describe('<AnimatedAxis />', () => {
  it('should be defined', () => {
    expect(AnimatedAxis).toBeDefined();
  });
  it('should render a VxAnimatedAxis', () => {
    expect(setup(<AnimatedAxis orientation="bottom" />).find(VxAnimatedAxis)).toHaveLength(1);
  });
});

const AxisComponent = (_: unknown) => null;

describe('<BaseAxis />', () => {
  it('should be defined', () => {
    expect(BaseAxis).toBeDefined();
  });
  it('should use scale=xScale for orientation=top/bottom', () => {
    const xScale = jest.fn();
    const axes = setup(
      <>
        <BaseAxis orientation="top" AxisComponent={AxisComponent} />
        <BaseAxis orientation="bottom" AxisComponent={AxisComponent} />
      </>,
      { xScale },
    ).find(AxisComponent);
    expect(axes.at(0).prop('scale')).toBe(xScale);
    expect(axes.at(1).prop('scale')).toBe(xScale);
  });
  it('should use scale=yScale for orientation=left/right', () => {
    const yScale = jest.fn();
    const axes = setup(
      <>
        <BaseAxis orientation="left" AxisComponent={AxisComponent} />
        <BaseAxis orientation="right" AxisComponent={AxisComponent} />
      </>,
      { yScale },
    ).find(AxisComponent);
    expect(axes.at(0).prop('scale')).toBe(yScale);
    expect(axes.at(1).prop('scale')).toBe(yScale);
  });
  it('should use axis styles from context theme unless specified in props', () => {
    const axisStyles = lightTheme.axisStyles.x.top;
    const axis = setup(
      <BaseAxis
        orientation="top"
        AxisComponent={AxisComponent}
        stroke="violet"
        tickLength={12345}
      />,
    ).find(AxisComponent);
    expect(axis.prop('labelProps')).toBe(axisStyles.axisLabel);
    expect(axis.prop('stroke')).toBe('violet');
    expect(axis.prop('strokeWidth')).toBe(axisStyles.axisLine.strokeWidth);
    expect(axis.prop('tickLength')).toBe(12345);
    expect(axis.prop('tickStroke')).toBe(axisStyles.tickLine.stroke);
  });
  it('should use props.tickLabelProps if passed', () => {
    const tickLabelProps = jest.fn(() => ({ fill: 'visx' }));
    const axis = setup(
      <BaseAxis orientation="left" AxisComponent={AxisComponent} tickLabelProps={tickLabelProps} />,
    ).find(AxisComponent);
    const tickLabelPropsFn = axis.prop('tickLabelProps') as Function;
    expect(tickLabelPropsFn()).toMatchObject({ fill: 'visx' });
  });
  it('should construct tickLabelProps from theme if props.tickLabelProps is not passed', () => {
    const tickStyles = lightTheme.axisStyles.y.left.tickLabel;
    const axis = setup(<BaseAxis orientation="left" AxisComponent={AxisComponent} />).find(
      AxisComponent,
    );
    const tickLabelProps = axis.prop('tickLabelProps') as Function;
    expect(tickLabelProps()).toMatchObject(tickStyles);
  });
});
