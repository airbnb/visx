import * as React from 'react';
import { shallow, mount } from 'enzyme';
import VxAnimatedAxis from '@visx/react-spring/lib/axis/AnimatedAxis';
import VxAxis from '@visx/axis/lib/axis/Axis';
import BaseAxis from '../src/components/axis/BaseAxis';
import { Axis, AnimatedAxis, DataContext, lightTheme } from '../src';

describe('<Axis />', () => {
  it('should be defined', () => {
    expect(Axis).toBeDefined();
  });
  it('should render a VxAxis', () => {
    const wrapper = shallow(<Axis orientation="bottom" />);
    expect(
      wrapper
        .find(BaseAxis)
        .dive()
        .find(VxAxis),
    ).toHaveLength(1);
  });
});

describe('<AnimatedAxis />', () => {
  it('should be defined', () => {
    expect(AnimatedAxis).toBeDefined();
  });
  it('should render a VxAnimatedAxis', () => {
    const wrapper = shallow(<AnimatedAxis orientation="bottom" />);
    expect(
      wrapper
        .find(BaseAxis)
        .dive()
        .find(VxAnimatedAxis),
    ).toHaveLength(1);
  });
});

const AxisComponent = (_: unknown) => null;

describe('<BaseAxis />', () => {
  it('should be defined', () => {
    expect(BaseAxis).toBeDefined();
  });
  it('should use scale=xScale for orientation=top/bottom', () => {
    const xScale = jest.fn();
    const axes = mount(
      // @ts-ignore partial context value
      <DataContext.Provider value={{ xScale }}>
        <BaseAxis orientation="top" AxisComponent={AxisComponent} />
        <BaseAxis orientation="bottom" AxisComponent={AxisComponent} />
      </DataContext.Provider>,
    ).find(AxisComponent);
    expect(axes.at(0).prop('scale')).toBe(xScale);
    expect(axes.at(1).prop('scale')).toBe(xScale);
  });
  it('should use scale=yScale for orientation=left/right', () => {
    const yScale = jest.fn();
    const axes = mount(
      // @ts-ignore partial context value
      <DataContext.Provider value={{ yScale }}>
        <BaseAxis orientation="left" AxisComponent={AxisComponent} />
        <BaseAxis orientation="right" AxisComponent={AxisComponent} />
      </DataContext.Provider>,
    ).find(AxisComponent);
    expect(axes.at(0).prop('scale')).toBe(yScale);
    expect(axes.at(1).prop('scale')).toBe(yScale);
  });
  it('should use axis styles from context theme unless specified in props', () => {
    const axisStyles = lightTheme.axisStyles.x.top;
    const axis = mount(
      // @ts-ignore partial context value
      <DataContext.Provider value={{ theme: lightTheme }}>
        <BaseAxis
          orientation="top"
          AxisComponent={AxisComponent}
          stroke="violet"
          tickLength={12345}
        />
      </DataContext.Provider>,
    ).find(AxisComponent);

    expect(axis.prop('labelProps')).toBe(axisStyles.axisLabel);
    expect(axis.prop('stroke')).toBe('violet');
    expect(axis.prop('strokeWidth')).toBe(axisStyles.axisLine.strokeWidth);
    expect(axis.prop('tickLength')).toBe(12345);
    expect(axis.prop('tickStroke')).toBe(axisStyles.tickLine.stroke);
  });
  it('should use props.tickLabelProps if passed', () => {
    const tickLabelProps = jest.fn();
    const axis = mount(
      // @ts-ignore partial context value
      <DataContext.Provider value={{ theme: lightTheme }}>
        <BaseAxis
          orientation="left"
          AxisComponent={AxisComponent}
          tickLabelProps={tickLabelProps}
        />
      </DataContext.Provider>,
    ).find(AxisComponent);
    expect(axis.prop('tickLabelProps')).toBe(tickLabelProps);
  });
  it('should use construct tickLabelProps from theme if props.tickLabelProps is not passed', () => {
    const tickStyles = lightTheme.axisStyles.y.left.tickLabel;
    const axis = mount(
      // @ts-ignore partial context value
      <DataContext.Provider value={{ theme: lightTheme }}>
        <BaseAxis orientation="left" AxisComponent={AxisComponent} />
      </DataContext.Provider>,
    ).find(AxisComponent);
    const tickLabelProps = axis.prop('tickLabelProps') as Function;
    expect(tickLabelProps()).toMatchObject(tickStyles);
  });
});
