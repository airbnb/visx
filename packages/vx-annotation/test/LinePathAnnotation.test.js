import React from 'react';
import { Point } from '@vx/point';
import { shallow } from 'enzyme';
import { LinePathAnnotation } from '../src';

describe('<LinePathAnnotation />', () => {
  test('it should be defined', () => {
    expect(LinePathAnnotation).toBeDefined();
  });

  test('it should be wrapped with defaults <Group top={0} left={0} />', () => {
    const wrapper = shallow(<LinePathAnnotation />);
    expect(wrapper.prop('top')).toEqual(0);
    expect(wrapper.prop('left')).toEqual(0);
    expect(wrapper.is('.vx-line-path-annotation-group')).toBe(true);
  });

  test('it should set <Group top= left= /> wrapper props', () => {
    const wrapper = shallow(
      <LinePathAnnotation
        top={20}
        left={300}
      />,
    );
    expect(wrapper.prop('top')).toEqual(20);
    expect(wrapper.prop('left')).toEqual(300);
  });

  test('it should contain a <LinePath />', () => {
    const wrapper = shallow(<LinePathAnnotation />);
    expect(wrapper.find('.vx-line-path-annotation').length).toBe(1);
  });

  test('it should pass props to <LinePath />', () => {
    const points = [new Point({ x: 0, y: 0 })];
    const wrapper = shallow(
      <LinePathAnnotation
        className="test"
        points={points}
      />,
    );
    const linePath = wrapper.find('.vx-line-path-annotation');
    expect(linePath.prop('data')).toBe(points);
    expect(linePath.prop('stroke')).toEqual('black');
    expect(linePath.prop('strokeWidth')).toEqual(1);
    expect(linePath.prop('className')).toEqual('vx-line-path-annotation test');
  });

  test('it should not render a label if label prop is undefined', () => {
    const wrapper = shallow(<LinePathAnnotation />);
    expect(wrapper.prop('children').filter(c => !!c).length).toBe(1);
  });

  test('it should render a label if label prop is defined', () => {
    const points = [new Point({ x: 0, y: 0 })];
    const wrapper = shallow(<LinePathAnnotation label="test" points={points} />);
    expect(wrapper.prop('children').filter(c => !!c).length).toBe(2);
    expect(wrapper.contains(<text dx={0} dy={0} fill="black" fontSize={10} paintOrder="stroke" stroke="white" strokeWidth={3} textAnchor="middle" x={0} y={0}>test</text>)).toBe(true);
  });
});
