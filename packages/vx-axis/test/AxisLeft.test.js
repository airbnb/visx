import React from 'react';
import { shallow } from 'enzyme';
import { Axis, AxisLeft } from '../src';
import { scaleLinear } from '../../vx-scale';

const axisProps = {
  scale: scaleLinear({
    rangeRound: [10, 0],
    domain: [0, 10],
  }),
};

describe('<AxisLeft />', () => {
  test('it should be defined', () => {
    expect(AxisLeft).toBeDefined();
  });

  test('it should render with class .vx-axis-left', () => {
    const wrapper = shallow(<AxisLeft {...axisProps} />);
    expect(wrapper.prop('axisClassName')).toEqual('vx-axis-left');
  });

  test('it should set user-specified axisClassName, axisLineClassName, labelClassName, and tickClassName', () => {
    const axisClassName = 'axis-test-class';
    const axisLineClassName = 'axisline-test-class';
    const labelClassName = 'label-test-class';
    const tickClassName = 'tick-test-class';

    const wrapper = shallow(
      <AxisLeft
        {...axisProps}
        axisClassName={axisClassName}
        axisLineClassName={axisLineClassName}
        labelClassName={labelClassName}
        tickClassName={tickClassName}
      />
    );

    const axis = wrapper.find(Axis);
    expect(axis.prop('axisClassName')).toMatch(axisClassName);
    expect(axis.prop('axisLineClassName')).toBe(axisLineClassName);
    expect(axis.prop('labelClassName')).toBe(labelClassName);
    expect(axis.prop('tickClassName')).toBe(tickClassName);
  });

  test('it should default labelOffset prop to 36', () => {
    const wrapper = shallow(<AxisLeft {...axisProps} />);
    expect(wrapper.prop('labelOffset')).toEqual(36);
  });

  test('it should set labelOffset prop', () => {
    const labelOffset = 3;
    const wrapper = shallow(<AxisLeft {...axisProps} labelOffset={labelOffset} />);
    expect(wrapper.prop('labelOffset')).toEqual(labelOffset);
  });

  test('it should default tickLength prop to 8', () => {
    const wrapper = shallow(<AxisLeft {...axisProps} />);
    expect(wrapper.prop('tickLength')).toEqual(8);
  });

  test('it should set tickLength prop', () => {
    const tickLength = 15;
    const wrapper = shallow(<AxisLeft {...axisProps} tickLength={tickLength} />);
    expect(wrapper.prop('tickLength')).toEqual(tickLength);
  });

  test('it should set label prop', () => {
    const label = 'test';
    const wrapper = shallow(<AxisLeft {...axisProps} label={label} />).dive();
    const text = wrapper.find('.vx-axis-label');
    expect(text.text()).toEqual(label);
  });
});
