import React from 'react';
import { AxisTop } from '../src';
import { shallow } from 'enzyme';

describe('<AxisTop />', () => {
  test('it should be defined', () => {
    expect(AxisTop).toBeDefined();
  });

  test('it should render with class .vx-axis-top', () => {
    const wrapper = shallow(<AxisTop />);
    expect(wrapper.prop('className')).toEqual('vx-axis-top');
  });

  test('it should set className', () => {
    const wrapper = shallow(<AxisTop className="test" />);
    expect(wrapper.prop('className')).toEqual('vx-axis-top test');
  });

  test('it should default labelOffset prop to 8', () => {
    const wrapper = shallow(<AxisTop />);
    expect(wrapper.prop('labelOffset')).toEqual(8);
  });

  test('it should set labelOffset prop', () => {
    const labelOffset = 3;
    const wrapper = shallow(<AxisTop labelOffset={labelOffset} />);
    expect(wrapper.prop('labelOffset')).toEqual(labelOffset);
  });

  test('it should default tickLength prop to 8', () => {
    const wrapper = shallow(<AxisTop />);
    expect(wrapper.prop('tickLength')).toEqual(8);
  });

  test('it should set tickLength prop', () => {
    const tickLength = 15;
    const wrapper = shallow(<AxisTop tickLength={tickLength} />);
    expect(wrapper.prop('tickLength')).toEqual(tickLength);
  });

  test('it should set labelComponent prop if label prop is string', () => {
    const label = 'test';
    const wrapper = shallow(<AxisTop label={label} />);
    const labelComponent = shallow(wrapper.prop('labelComponent'));
    expect(labelComponent.prop('children')).toEqual(label);
  });

  test('it should set labelComponent prop if label is a component', () => {
    const labelText = 'test';
    const label = (<text>{labelText}</text>);
    const wrapper = shallow(<AxisTop label={label} />);
    const labelComponent = shallow(wrapper.prop('labelComponent'));
    expect(labelComponent.node.type).toEqual('text');
    expect(labelComponent.prop('children')).toEqual(labelText);
  });
});
