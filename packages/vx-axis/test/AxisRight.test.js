import React from 'react';
import { AxisRight } from '../src';
import { shallow } from 'enzyme';

describe('<AxisRight />', () => {
  test('it should be defined', () => {
    expect(AxisRight).toBeDefined();
  });

  test('it should render with class .vx-axis-right', () => {
    const wrapper = shallow(<AxisRight />);
    expect(wrapper.prop('className')).toEqual('vx-axis-right');
  });

  test('it should set className', () => {
    const wrapper = shallow(<AxisRight className="test" />);
    expect(wrapper.prop('className')).toEqual('vx-axis-right test');
  });

  test('it should default labelOffset prop to 36', () => {
    const wrapper = shallow(<AxisRight />);
    expect(wrapper.prop('labelOffset')).toEqual(36);
  });

  test('it should set labelOffset prop', () => {
    const labelOffset = 3;
    const wrapper = shallow(<AxisRight labelOffset={labelOffset} />);
    expect(wrapper.prop('labelOffset')).toEqual(labelOffset);
  });

  test('it should default tickLength prop to 8', () => {
    const wrapper = shallow(<AxisRight />);
    expect(wrapper.prop('tickLength')).toEqual(8);
  });

  test('it should set tickLength prop', () => {
    const tickLength = 15;
    const wrapper = shallow(<AxisRight tickLength={tickLength} />);
    expect(wrapper.prop('tickLength')).toEqual(tickLength);
  });

  test('it should set labelComponent prop if label prop is string', () => {
    const label = 'test';
    const wrapper = shallow(<AxisRight label={label} />);
    const labelComponent = shallow(wrapper.prop('labelComponent'));
    expect(labelComponent.prop('children')).toEqual(label);
  });

  test('it should set labelComponent prop if label is a component', () => {
    const labelText = 'test';
    const label = (<text>{labelText}</text>);
    const wrapper = shallow(<AxisRight label={label} />);
    const labelComponent = shallow(wrapper.prop('labelComponent'));
    expect(labelComponent.node.type).toEqual('text');
    expect(labelComponent.prop('children')).toEqual(labelText);
  });
});
